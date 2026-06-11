'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AuthUser, UserRole } from '@/types';
import { Loader2, Building2 } from 'lucide-react';

interface AuthContextType {
  user: AuthUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasRole: (roles: UserRole[]) => boolean;
  canAccessLab: (labId: string) => boolean;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function isAuthEnabled() {
  return typeof window !== 'undefined' && !!auth;
}

async function fetchUserFromToken(token: string): Promise<Partial<AuthUser>> {
  try {
    const res = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });
    if (res.ok) {
      const data = await res.json();
      return {
        id: data.uid,
        firebaseUid: data.uid,
        email: data.email,
        displayName: data.name,
        role: data.role as UserRole,
      };
    }
  } catch {
    // fallback to client-side claims
  }
  return {};
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthEnabled()) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth!, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          const idTokenResult = await fbUser.getIdTokenResult();
          const role = (idTokenResult.claims.role as UserRole) || 'laboran';

          const serverData = await fetchUserFromToken(await fbUser.getIdToken());

          setUser({
            id: serverData.id || fbUser.uid,
            firebaseUid: fbUser.uid,
            email: serverData.email || fbUser.email || '',
            displayName: serverData.displayName || fbUser.displayName || fbUser.email?.split('@')[0] || '',
            role: serverData.role || role,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase not initialized');
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const errorCode = (err as { code?: string }).code;
      let message = 'Terjadi kesalahan. Silakan coba lagi.';
      switch (errorCode) {
        case 'auth/user-not-found':
          message = 'Akun tidak ditemukan. Periksa email Anda.';
          break;
        case 'auth/wrong-password':
          message = 'Kata sandi salah. Silakan coba lagi.';
          break;
        case 'auth/invalid-email':
          message = 'Format email tidak valid.';
          break;
        case 'auth/too-many-requests':
          message = 'Terlalu banyak percobaan gagal. Coba lagi nanti.';
          break;
        case 'auth/network-request-failed':
          message = 'Koneksi bermasalah. Periksa internet Anda.';
          break;
        case 'auth/invalid-credential':
          message = 'Email atau kata sandi salah.';
          break;
      }
      setError(message);
      throw new Error(message);
    }
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
    setUser(null);
  };

  const refreshUser = useCallback(async () => {
    if (!firebaseUser) return;
    const token = await firebaseUser.getIdToken(true);
    const serverData = await fetchUserFromToken(token);
    const idTokenResult = await firebaseUser.getIdTokenResult();
    const role = serverData.role || (idTokenResult.claims.role as UserRole) || 'laboran';
    setUser((prev) => prev ? { ...prev, ...serverData, role } : prev);
  }, [firebaseUser]);

  const getToken = useCallback(async () => {
    if (!firebaseUser) return null;
    try {
      return await firebaseUser.getIdToken();
    } catch {
      return null;
    }
  }, [firebaseUser]);

  const hasRole = (roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const canAccessLab = (_labId: string) => {
    if (!user) return false;
    if (user.role === 'kepalalab') return true;
    return user.labs?.some((lab) => lab.id === _labId) ?? false;
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    error,
    login,
    logout,
    refreshUser,
    hasRole,
    canAccessLab,
    getToken,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-6">
            <Building2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">LabTrack</h1>
          <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mt-4" />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}