'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { UserProvider } from '@/hooks/useUser'; // Import UserProvider

export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>
          <UserProvider>{children}</UserProvider> {/* Wrap children in UserProvider */}
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
