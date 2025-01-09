// types/next-auth.d.ts or next-auth.d.ts
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      onboarded: boolean; // Add custom property
      selectedRestaurant?:string,
    } & DefaultSession['user'];
  }
}
