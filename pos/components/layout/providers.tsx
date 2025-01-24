'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { UserProvider } from '@/hooks/useUser';

interface ProvidersProps {
  session: any;
  children: React.ReactNode;
}

export default function Providers({ session, children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <UserProvider session={session}>
        {children}
      </UserProvider>
    </ThemeProvider>
  );
}
