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
  async session({ session, user }) {
    //console.log("Session:", session);
    console.log("User:", user);
    // Add user ID to the session
    if (user?.id) {
      session.user.id = user.id;
    }
    console.log("Session:", user.id);
    return session;
  },
}
 

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };