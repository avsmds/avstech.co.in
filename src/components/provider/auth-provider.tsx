// components/AuthProvider.tsx
'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/authstore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);


  return <>{children}</>;
}