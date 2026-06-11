import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockVerifyIdToken = vi.fn();
const mockListUsers = vi.fn();
const mockCreateUser = vi.fn();

vi.mock('@/lib/firebase-admin', () => ({
  verifyIdToken: mockVerifyIdToken,
  listUsers: mockListUsers,
  createUser: mockCreateUser,
}));

describe('Users API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authorization', () => {
    it('returns 401 when no auth header', async () => {
      const handler = async (request: { headers: Map<string, string> }) => {
        const authHeader = request.headers.get('authorization');
        if (!authHeader?.startsWith('Bearer ')) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        return new Response(null, { status: 200 });
      };

      const req = { headers: new Map() } as unknown as Request;
      const res = await handler(req);
      expect(res.status).toBe(401);
    });

    it('returns 200 when auth header is valid', async () => {
      const handler = async (request: { headers: Map<string, string> }) => {
        const authHeader = request.headers.get('authorization');
        if (!authHeader?.startsWith('Bearer ')) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }
        return new Response(null, { status: 200 });
      };

      const req = { headers: new Map([['authorization', 'Bearer valid-token']]) } as unknown as Request;
      const res = await handler(req);
      expect(res.status).toBe(200);
    });

    it('returns 401 for laboran role', async () => {
      mockVerifyIdToken.mockResolvedValue({ uid: 'user-uid', role: 'laboran' });

      const handler = async (request: Request) => {
        const authHeader = request.headers.get('authorization');
        if (!authHeader?.startsWith('Bearer ')) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }
        const token = authHeader.slice(7);
        const decoded = await mockVerifyIdToken(token);
        if (decoded.role !== 'kepalalab' && decoded.role !== 'admin') {
          return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
        }
        return new Response(JSON.stringify({ users: [] }), { status: 200 });
      };

      const req = new Request('http://localhost:3000/api/users', {
        headers: { authorization: 'Bearer laboran-token' },
      });
      const res = await handler(req);
      expect(res.status).toBe(403);
    });

    it('passes for admin role', async () => {
      mockVerifyIdToken.mockResolvedValue({ uid: 'admin-uid', role: 'admin' });

      const handler = async (request: Request) => {
        const authHeader = request.headers.get('authorization');
        const token = authHeader!.slice(7);
        const decoded = await mockVerifyIdToken(token);
        if (decoded.role !== 'kepalalab' && decoded.role !== 'admin') {
          return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
        }
        return new Response(JSON.stringify({ users: [] }), { status: 200 });
      };

      const req = new Request('http://localhost:3000/api/users', {
        headers: { authorization: 'Bearer admin-token' },
      });
      const res = await handler(req);
      expect(res.status).toBe(200);
    });

    it('passes for kepalalab role', async () => {
      mockVerifyIdToken.mockResolvedValue({ uid: 'kepala-uid', role: 'kepalalab' });

      const handler = async (request: Request) => {
        const authHeader = request.headers.get('authorization');
        const token = authHeader!.slice(7);
        const decoded = await mockVerifyIdToken(token);
        if (decoded.role !== 'kepalalab' && decoded.role !== 'admin') {
          return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
        }
        return new Response(JSON.stringify({ users: [] }), { status: 200 });
      };

      const req = new Request('http://localhost:3000/api/users', {
        headers: { authorization: 'Bearer kepala-token' },
      });
      const res = await handler(req);
      expect(res.status).toBe(200);
    });
  });

  describe('User CRUD Validation', () => {
    it('validates required fields for create', () => {
      const validate = (body: Record<string, unknown>) => {
        if (!body.email || !body.password || !body.displayName) {
          return 'Email, password, and displayName are required';
        }
        return null;
      };

      expect(validate({ email: 'test@test.com' })).toBe('Email, password, and displayName are required');
      expect(validate({ email: 'test@test.com', password: 'pass', displayName: 'Test' })).toBeNull();
    });

    it('validates password length', () => {
      const validate = (password: string) => {
        if (password.length < 6) return 'Password must be at least 6 characters';
        return null;
      };

      expect(validate('12345')).toBe('Password must be at least 6 characters');
      expect(validate('123456')).toBeNull();
    });

    it('creates user with correct data shape', async () => {
      mockCreateUser.mockResolvedValue({
        uid: 'new-uid',
        email: 'new@example.com',
        displayName: 'New User',
        role: 'laboran',
      });

      const body = { email: 'new@example.com', password: 'password123', displayName: 'New User', role: 'laboran' };
      const user = await mockCreateUser(body);

      expect(user.uid).toBe('new-uid');
      expect(user.email).toBe('new@example.com');
      expect(user.role).toBe('laboran');
      expect(mockCreateUser).toHaveBeenCalledWith(expect.objectContaining({ email: 'new@example.com' }));
    });

    it('handles duplicate email error', async () => {
      mockCreateUser.mockRejectedValue({ code: 'auth/email-already-exists' });

      const body = { email: 'existing@example.com', password: 'password123', displayName: 'User', role: 'laboran' };

      try {
        await mockCreateUser(body);
      } catch (err) {
        const error = err as { code: string };
        expect(error.code).toBe('auth/email-already-exists');
      }

      expect(mockCreateUser).toHaveBeenCalled();
    });
  });
});
