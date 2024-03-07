import NextAuth from 'next-auth';
import 'next-auth/jwt'
import type { User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { Role, User } from '@prisma/client';


type userId= string

declare module 'next-auth/jwt' {
  interface JWT {
    id: userId;
    lastLogin: Date;
    role: Role
    email: string
    name: string
    image: string
  }
}


declare module 'next-auth' {
  interface Session {
    user: {
      id: userId;
      lastLogin: Date;
      role: Role
      email: string
      name: string
      image: string

    } & DefaultSession['user'];
  }
}