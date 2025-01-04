import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import Restaurant from './lib/models/Restaurant';
import connectDB from './lib/mongodb';

const authConfig: NextAuthConfig = {
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
      },
      async authorize(credentials, req) {
        try {
          const {email,password,name}=credentials

          // Ensure MongoDB connection is established
          await connectDB();

          // Check if the user (restaurant) exists in the DB
          let user = await Restaurant.findOne({ email }).catch((err) => {
            console.error('Error during findOne:', err);
            return null;
          });

          if (!user) {
            // If the user doesn't exist, create a new restaurant profile
            const newRestaurant = new Restaurant({
              email,
              name, // Default to email for the name
              password, // Hash the password before saving in a real-world app
            });

            await newRestaurant.save().catch((err) => {
              console.error('Error during restaurant creation:', err);
              return null;
            });

            // Create a user object to return
            user = {
              id: newRestaurant._id.toString(), // MongoDB _id used as a unique user ID
              name: newRestaurant.name,
              email: newRestaurant.email,
              onboard: false, // Assuming onboarding is false by default
            };
          }

          return {
            id: user._id.toString(), // Always return a unique user ID
            name: user.name,
            email: user.email,
            onboard: user.onboard,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/', // Custom sign-in page
  },
  callbacks: {
    // This callback is called whenever a JWT token is created
    async jwt({ token, user }) {
      if (user) {
        // Store the user ID and other necessary data in the token
        token.id = user.id;
        token.email = user.email;
        token.onboard = user.onboard;
      }
      return token;
    },
    // This callback is called when a session is created
    async session({ session, token }) {
      // Add user data from the JWT token to the session
      session.user.id = token.id; // Ensure `id` is part of the session
      session.user.email = token.email;
      session.user.onboard = token.onboard;

      // Handle redirection if the user has not completed onboarding
      if (!token.onboard) {
        session.redirectTo = '/onboard-restaurant';
      }

      return session;
    },
  },
};

export default authConfig;
