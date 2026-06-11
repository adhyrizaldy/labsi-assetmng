import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();
    if (!idToken) {
      return NextResponse.json({ error: 'idToken is required' }, { status: 400 });
    }

    const decoded = await verifyIdToken(idToken);

    return NextResponse.json({
      uid: decoded.uid,
      email: decoded.email || '',
      role: decoded.role || 'laboran',
      name: decoded.name || decoded.email?.split('@')[0] || '',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}