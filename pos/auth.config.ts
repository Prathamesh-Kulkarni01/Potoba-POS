import { NextAuthConfig, User as NextAuthUser } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { loginOwner, loginStaff, loginKitchen, loginCustomer, loginAdmin } from './lib/api/auth';

interface User extends NextAuthUser {
  role: string;
  selectedRestaurant?: string;
  token?: string;
}

const authConfig: NextAuthConfig = {
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: {
          type: 'password',
        },
        role: {
          type: 'text',
        },
      },
      async authorize(credentials: Partial<Record<'role' | 'email' | 'password', unknown>> | undefined, req: any) {
        console.log(credentials);
        if (!credentials) {
          throw new Error('No credentials provided');
        }
        const { email, password, role } = credentials;
        if (!email || !password || !role) {
          throw new Error('Missing email, password, or role');
        }

        let response;
        switch (role) {
          case 'owner':
            response = await loginOwner({ email, password });
            break;
          case 'staff':
            response = await loginStaff({ email, password });
            break;
          case 'kitchen':
            response = await loginKitchen({ email, password });
            break;
          case 'customer':
            response = await loginCustomer({ email, password });
            break;
          case 'admin':
            response = await loginAdmin({ email, password });
            break;
          default:
            throw new Error('Invalid role');
        }
        if (response) {
          const { token, user } = await response;
          user.token = token; // Attach token to user object
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/', // Custom sign-in page
  },
  session: {
    strategy: "jwt", // Use JWT strategy instead of sessions
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as User).role;
        token.selectedRestaurant = (user as User).selectedRestaurant || null;
        token.token = (user as User).token; // Store the token in the JWT
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id as string;
      session.user.email = token.email ?? '';
      session.user.role = token.role;
      session.user.selectedRestaurant = token.selectedRestaurant || null;
      session.user.token = token.token; // Add token to session
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: true, // Ensure cookies are secure in production
        sameSite: "lax", // Or "strict", depending on your needs
      },
    },
  },
  // events: {
  //   async updateUser({ user }) {
  //     // Update session when user updates
  //     await updateSessionUser(user);
  //   },
  // },
  secret: process.env.AUTH_SECRET,
};

export default authConfig;
