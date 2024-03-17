import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'prisma/client'; // Ensure this import path is correct. It's usually something like '../../../prisma/client' depending on your project structure
import { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user is defined, this is a sign-in
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { organization: true },
        });

        if (dbUser) {
          // Add custom claims to JWT. These will be persisted across sessions
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.organizationId = dbUser.organizationId || null; // Ensuring null if undefined
          token.email = dbUser.email;
          token.lastLogin = new Date(); // Store as ISO string for consistency across various databases and timezone handling
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Assign the custom claims from JWT to the session object
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.organizationId = token.organizationId;
        session.user.lastLogin = token.lastLogin ? new Date(token.lastLogin) : new Date(); // Convert back to Date object or use current date
        // Since email, name, and image are already part of the session object, only override if necessary
        session.user.email = token.email ?? session.user.email;
        session.user.name = token.name ?? session.user.name;
        session.user.image = token.image ?? session.user.image;
      }
      return session;
    },
  },
};

export default authOptions;
