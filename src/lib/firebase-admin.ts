import { createRequire } from 'module';

const req = createRequire(import.meta.url);

let initializationError: string | null = null;

function getServiceAccount(): Record<string, unknown> {
  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!key) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.\n' +
      '1. Go to Firebase Console > Project Settings > Service Accounts\n' +
      '2. Click "Generate new private key"\n' +
      '3. Copy the entire JSON content\n' +
      '4. Set it as FIREBASE_SERVICE_ACCOUNT_KEY in .env.local'
    );
  }
  try {
    return JSON.parse(key);
  } catch {
    return JSON.parse(Buffer.from(key, 'base64').toString());
  }
}

function getAdminApp() {
  const { initializeApp, getApps, cert } = req('firebase-admin/app');
  const existingApp = getApps()[0];
  return existingApp || initializeApp({
    credential: cert(getServiceAccount()),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

function getAdminAuth() {
  try {
    const { getAuth } = req('firebase-admin/auth');
    return getAuth(getAdminApp());
  } catch (error) {
    initializationError = (error as Error).message;
    throw error;
  }
}

export function getStorageBucket() {
  try {
    const { getStorage } = req('firebase-admin/storage');
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    const bucket = getStorage(getAdminApp()).bucket(bucketName);
    return bucket;
  } catch (error) {
    initializationError = (error as Error).message;
    throw error;
  }
}

export function verifyIdToken(token: string) {
  if (initializationError) throw new Error(initializationError);
  return getAdminAuth().verifyIdToken(token);
}

export async function setUserRole(uid: string, role: string) {
  await getAdminAuth().setCustomUserClaims(uid, { role });
}

export async function createUser(data: {
  email: string;
  password: string;
  displayName: string;
  role: string;
  roleTitle?: string;
  phone?: string;
}) {
  const auth = getAdminAuth();
  const user = await auth.createUser({
    email: data.email,
    password: data.password,
    displayName: data.displayName,
  });

  await auth.setCustomUserClaims(user.uid, { role: data.role });

  return {
    uid: user.uid,
    email: user.email!,
    displayName: user.displayName!,
    role: data.role,
  };
}

export async function updateUser(
  uid: string,
  data: {
    email?: string;
    password?: string;
    displayName?: string;
    role?: string;
    disabled?: boolean;
  }
) {
  const auth = getAdminAuth();
  const updateData: Record<string, unknown> = {};
  if (data.email) updateData.email = data.email;
  if (data.password) updateData.password = data.password;
  if (data.displayName) updateData.displayName = data.displayName;
  if (data.disabled !== undefined) updateData.disabled = data.disabled;

  if (Object.keys(updateData).length > 0) {
    await auth.updateUser(uid, updateData);
  }

  if (data.role) {
    await auth.setCustomUserClaims(uid, { role: data.role });
  }

  return auth.getUser(uid);
}

export async function deleteUser(uid: string) {
  await getAdminAuth().deleteUser(uid);
}

export async function listUsers(maxResults = 100, pageToken?: string) {
  return getAdminAuth().listUsers(maxResults, pageToken);
}