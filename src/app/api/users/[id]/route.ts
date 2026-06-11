import { NextRequest, NextResponse } from 'next/server';
import { updateUser, deleteUser, verifyIdToken } from '@/lib/firebase-admin';

async function checkAdminRole(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  try {
    const decoded = await verifyIdToken(authHeader.slice(7));
    return decoded.role === 'kepalalab' ? decoded : null;
  } catch {
    return null;
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await checkAdminRole(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    if (body.email) updateData.email = body.email;
    if (body.password) updateData.password = body.password;
    if (body.displayName) updateData.displayName = body.displayName;
    if (body.role) updateData.role = body.role;
    if (body.isActive !== undefined) updateData.disabled = !body.isActive;

    const updated = await updateUser(id, updateData);

    return NextResponse.json({
      id: updated.uid,
      email: updated.email,
      displayName: updated.displayName,
      role: (updated.customClaims?.role as string) || 'laboran',
      isActive: !updated.disabled,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await checkAdminRole(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  if (id === admin.uid) {
    return NextResponse.json(
      { error: 'Cannot delete yourself' },
      { status: 400 }
    );
  }

  try {
    await deleteUser(id);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to delete user' },
      { status: 500 }
    );
  }
}