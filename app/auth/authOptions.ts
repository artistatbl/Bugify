import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'prisma/client';
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
	  if (user) {
	    const dbUser = await prisma.user.findUnique({
		 where: {
		   email: user.email,
		 },
	    });
	    if (dbUser) {
		 // Add custom claims to JWT. These will be persisted across sessions
		 token.id = dbUser.id;
		//  token.email = dbUser.email;
		 token.role = dbUser.role;
		 token.lastLogin = new Date; // Store as string
		//  token.name = dbUser.name;
	    }
	  }
	  return token;
	},
	async session({ session, token }) {
	  // Assign the custom claims from JWT to the session object
	  session.user.id = token.id as string; // Ensure the type matches
	  session.user.email = token.email ?? session.user.email; 
	  session.user.role = token.role ?? session.user.role; // Fallback to existing email if not in token
	  session.user.lastLogin = token.lastLogin ? new Date(token.lastLogin) : new Date(); 
	  session.user.name = token.name ?? session.user.name; // Convert back to Date object or use current date
	  return session;
	},
   },
 };
 export default authOptions