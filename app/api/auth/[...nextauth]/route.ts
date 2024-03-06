import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "prisma/client";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
   const now = new Date();
   await prisma.user.update({
     where: {
       id: user.id,
     },
     data: {
       lastLogin: now,
     },
   })
    return true;
  },
  async session({ session, user }) {
    // Attach additional user information (e.g., lastLogin) to the session object
    if (user?.id) {
      session.user.id = user.id;
      //session.user.role = user.role;
      // Fetch the updated lastLogin from the database
      const updatedUser = await prisma.user.findUnique({
        where: { id: user.id },
      });
      session.user.lastLogin = updatedUser?.lastLogin;
    }
    return session;
}
}

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };