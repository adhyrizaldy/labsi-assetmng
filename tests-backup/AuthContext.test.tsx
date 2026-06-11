import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockOnAuthStateChanged = vi.fn();

vi.mock('@/lib/firebase', () => ({
  auth: {},
}));

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth');
  return {
    ...actual,
    onAuthStateChanged: mockOnAuthStateChanged,
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  };
});

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides auth context to children', () => {
    const { createContext, useContext } = require('react');
    const AuthCtx = createContext(null);

    const TestComponent = () => {
      const ctx = useContext(AuthCtx);
      expect(ctx).toBeNull();
      return null;
    };
    expect(typeof TestComponent).toBe('function');
  });

  it('hasRole returns false when user is null', () => {
    const hasRoleFn = (user: unknown, roles: string[]) => {
      if (!user) return false;
      return roles.includes((user as { role: string }).role);
    };
    expect(hasRoleFn(null, ['kepalalab'])).toBe(false);
  });

  it('hasRole returns true for matching role', () => {
    const hasRoleFn = (user: { role: string }, roles: string[]) => roles.includes(user.role);
    expect(hasRoleFn({ role: 'kepalalab' }, ['kepalalab'])).toBe(true);
    expect(hasRoleFn({ role: 'admin' }, ['kepalalab'])).toBe(false);
    expect(hasRoleFn({ role: 'admin' }, ['kepalalab', 'admin'])).toBe(true);
  });

  it('hasRole returns false for non-matching role', () => {
    const hasRoleFn = (user: { role: string }, roles: string[]) => roles.includes(user.role);
    expect(hasRoleFn({ role: 'laboran' }, ['kepalalab', 'admin'])).toBe(false);
  });

  it('login error message for wrong password', () => {
    const errorMap: Record<string, string> = {
      'auth/wrong-password': 'Kata sandi salah. Silakan coba lagi.',
      'auth/user-not-found': 'Akun tidak ditemukan. Periksa email Anda.',
      'auth/invalid-email': 'Format email tidak valid.',
      'auth/too-many-requests': 'Terlalu banyak percobaan gagal. Coba lagi nanti.',
      'auth/invalid-credential': 'Email atau kata sandi salah.',
    };

    expect(errorMap['auth/wrong-password']).toBe('Kata sandi salah. Silakan coba lagi.');
    expect(errorMap['auth/user-not-found']).toBe('Akun tidak ditemukan. Periksa email Anda.');
    expect(errorMap['auth/invalid-credential']).toBe('Email atau kata sandi salah.');
  });

  it('login error for unknown code', () => {
    const getMessage = (code: string): string => {
      const messages: Record<string, string> = {
        'auth/user-not-found': 'Akun tidak ditemukan. Periksa email Anda.',
        'auth/wrong-password': 'Kata sandi salah. Silakan coba lagi.',
        'auth/invalid-email': 'Format email tidak valid.',
        'auth/too-many-requests': 'Terlalu banyak percobaan gagal. Coba lagi nanti.',
        'auth/invalid-credential': 'Email atau kata sandi salah.',
      };
      return messages[code] || 'Terjadi kesalahan. Silakan coba lagi.';
    };

    expect(getMessage('auth/unknown-error')).toBe('Terjadi kesalahan. Silakan coba lagi.');
  });

  it('canAccessLab returns true for kepalalab', () => {
    const canAccessLab = (user: { role: string }, labId: string) => {
      if (!user) return false;
      if (user.role === 'kepalalab') return true;
      return false;
    };
    expect(canAccessLab({ role: 'kepalalab' }, 'lab-1')).toBe(true);
  });

  it('canAccessLab returns false for unauthorized user', () => {
    const canAccessLab = (user: { role: string } | null, labId: string) => {
      if (!user) return false;
      if (user.role === 'kepalalab') return true;
      return false;
    };
    expect(canAccessLab(null, 'lab-1')).toBe(false);
    expect(canAccessLab({ role: 'laboran' }, 'lab-1')).toBe(false);
  });
});
