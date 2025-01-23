import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";

export const authOptions : NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        credentials: {
          email: {
            type: 'email',
          },
          password: {
            type: 'password',
          },
          // role: {
          //   type: 'text',
          // },
        },
      },
      async authorize(credentials) {
        // Validate credentials with your database here
        const user = {
          id: "1",
          name: "Admin",
          email: "admin@example.com",
          image: "https://avatars.githubusercontent.com/u/80968727?v=4",
          username: "admin",
          password: "admin1",
        };

        if (
          (credentials?.username == user.username||credentials?.email == user.email) &&
          credentials.password == user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {},
  pages: {
    signIn: "/signin",
  },
  secret: process.env.AUTH_SECRET!,
};