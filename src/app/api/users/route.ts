import { NextRequest, NextResponse } from 'next/server';
import { createUser, verifyIdToken, listUsers } from '@/lib/firebase-admin';

async function checkAdminRole(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  try {
    const decoded = await verifyIdToken(authHeader.slice(7));
    return decoded.role === 'kepalalab' ? decoded : null;
  } catch {
    return null;
  }
}

function mapUserRecord(record: { uid: string; email?: string; displayName?: string; customClaims?: Record<string, unknown>; disabled: boolean; metadata: { creationTime?: string }; phoneNumber?: string }) {
  return {
    id: record.uid,
    uid: record.uid,
    email: record.email || '',
    displayName: record.displayName || record.email?.split('@')[0] || '',
    role: (record.customClaims?.role as string) || 'laboran',
    isActive: !record.disabled,
    createdAt: record.metadata.creationTime || new Date().toISOString(),
    phone: record.phoneNumber || '',
  };
}

export async function GET(request: NextRequest) {
  const admin = await checkAdminRole(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const role = url.searchParams.get('role');

  try {
      const allUsers: ReturnType<typeof mapUserRecord>[] = [];
      let pageToken: string | undefined;

      do {
        const result = await listUsers(100, pageToken);
        for (const user of result.users) {
        const mapped = mapUserRecord(user);
        if (!role || mapped.role === role) {
          allUsers.push(mapped);
        }
      }
      pageToken = result.pageToken;
    } while (pageToken);

    return NextResponse.json({ users: allUsers });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to list users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const admin = await checkAdminRole(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, password, displayName, role, roleTitle, phone } = body;

    if (!email || !password || !displayName || !role) {
      return NextResponse.json(
        { error: 'email, password, displayName, and role are required' },
        { status: 400 }
      );
    }

    if (!['admin', 'laboran'].includes(role)) {
      return NextResponse.json(
        { error: 'Role must be admin or laboran' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const user = await createUser({ email, password, displayName, role, roleTitle, phone });

    return NextResponse.json({
      message: 'User created successfully',
      user,
    });
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err.code === 'auth/email-already-exists') {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    return NextResponse.json({ error: err.message || 'Failed to create user' }, { status: 500 });
  }
}