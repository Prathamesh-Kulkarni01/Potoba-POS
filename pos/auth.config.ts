import { NextAuthConfig, User as NextAuthUser } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

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
        console.debug('Authorize called with credentials:', credentials);
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
        const res = await response;
        console.debug('Login response:', res);
        if (res?.token) {
          const {user, token}= res;
          user.token = token; // Attach token to user object
          console.log({user});
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
      console.debug('JWT callback called with token and user:', token, user);
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
      console.debug('Session callback called with session and token:', session, token);
      session.user.id = token.id as string;
      session.user.email = token.email ?? '';
      session.user.role = token.role;
      session.user.selectedRestaurant = token.selectedRestaurant || null;
      session.user.token = token.token; // Add token to session
      return session;
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

const BASE_URL = process.env.BACKEND_API_URL;

const fetchAPI = async (endpoint:string, options = {}) => {
  console.debug('fetchAPI called with endpoint and options:', endpoint, options);
  const authHeaders = {
    "Content-Type": "application/json"
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: { ...authHeaders},
    });
    console.log({response})
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error('fetchAPI error:', err);
    throw err; // Re-throw for component-level handling if needed
  } finally {
    console.debug('fetchAPI finally block executed');
  }
}

const post = (endpoint:string, body:any) => {
  console.debug('post called with endpoint and body:', endpoint, body);
  return fetchAPI(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

const loginOwner = async (body:any) => post("/auth/login/owner", body);
const loginStaff = async (body:any) => post("/auth/login/staff", body);
const loginKitchen = async (body:any) => post("/auth/login/kitchen", body);
const loginCustomer = async (body:any) => post("/auth/login/customer", body);
const loginAdmin = async (body:any) => post("/auth/login/admin", body);