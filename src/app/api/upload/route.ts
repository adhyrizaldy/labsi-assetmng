import { NextRequest, NextResponse } from 'next/server';
import { getStorageBucket, verifyIdToken } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const decoded = await verifyIdToken(token);
    const role = decoded.role as string;
    if (role !== 'kepalalab' && role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const folder = (formData.get('folder') as string) || 'assets';
    const ext = file.name.split('.').pop() || 'png';
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const bucket = getStorageBucket();
    const blob = bucket.file(filename);
    await blob.save(buffer, {
      metadata: { contentType: file.type },
    });

    await blob.makePublic();

    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filename)}?alt=media`;

    return NextResponse.json({ url: publicUrl, path: filename });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json(
      { error: err.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
