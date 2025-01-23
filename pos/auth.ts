import NextAuth from 'next-auth';
import { authOptions } from './auth.config';

export const { auth, handlers, signOut, signIn } = NextAuth(authOptions);
