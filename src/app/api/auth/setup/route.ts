import { NextRequest, NextResponse } from 'next/server';
import { listUsers, createUser, verifyIdToken } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const result = await listUsers(1);
    const hasUsers = result.users.length > 0;

    return NextResponse.json({
      initialized: hasUsers,
      userCount: result.users.length,
    });
  } catch {
    return NextResponse.json(
      { error: 'Service account not configured' },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const result = await listUsers(1);
    if (result.users.length > 0) {
      return NextResponse.json(
        { error: 'System already initialized. There are existing users.' },
        { status: 409 }
      );
    }

    const body = await request.json();
    const { email, password, displayName } = body;

    if (!email || !password || !displayName) {
      return NextResponse.json(
        { error: 'Email, password, and displayName are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const user = await createUser({
      email,
      password,
      displayName,
      role: 'kepalalab',
      roleTitle: 'Kepala Laboratorium',
    });

    return NextResponse.json({
      message: 'KepalaLab account created successfully',
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: 'kepalalab',
      },
    });
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err.code === 'auth/email-already-exists') {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: err.message || 'Failed to create admin account' },
      { status: 500 }
    );
  }
}