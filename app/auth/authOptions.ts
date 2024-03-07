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
	// Handle sign-in events
	async signIn({ user }) {
		try {
		  // First, check if the user exists in the database
		  const existingUser = await prisma.user.findUnique({
		    where: {
			 id: user.id,
		    },
		  });
	   
		  // If the user exists, proceed to update the lastLogin field
		  if (existingUser) {
		    const now = new Date();
		    await prisma.user.update({
			 where: {
			   id: user.id,
			 },
			 data: {
			   lastLogin: now,
			 },
		    });
		  } else {
		    // Optionally, handle the case where the user does not exist if needed
		    console.log(`User with ID ${user.id} not found.`);
		  }
		  return true;
		} catch (error) {
		  console.error('Error in signIn callback:', error);
		  return false; // Return false to indicate a failed sign-in attempt
		}
	   },	   
	async session({ session, user }) {
		try {
		  // Attach additional user information (e.g., lastLogin) to the session object
		  if (user?.id) {
		    session.user.id = user.id;
		    // Fetch the updated lastLogin from the database
		    const updatedUser = await prisma.user.findUnique({
			 where: { id: user.id },
		    });
		    if (updatedUser) {
			 session.user.lastLogin = updatedUser.lastLogin;
		    }
		  }
		  return session;
		} catch (error) {
		  console.error('Session error:', error);
		  return session; // Return the session object even in case of an error
		}
	   },
	 },
    };

export default authOptions;