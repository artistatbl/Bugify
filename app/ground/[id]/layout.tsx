import React from 'react'
import { Metadata } from 'next'
import SideNav from '@/components/issues/SideNav'
import { getServerSession } from 'next-auth/next'
import  authOptions  from "@/app/auth/authOptions";
import {ReactNode} from 'react'
import prisma from 'prisma/client';
import { notFound } from 'next/navigation';




export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
}

const Layout = async ({
  children,
  params: { id },

}: {
  children: ReactNode
  params: { id: string }


}) => {
  





   const session  = await getServerSession(authOptions)
   const ground = await prisma.organization.findFirst({
		where: {
			name: id
      
		},
		include: {
			//grounds: true
			
		}
	});
	if (!ground) return notFound()
	console.log(ground)

  return (
    <>
    <SideNav session={session}/>
    <div>layout</div>
    </>
  )
  }

export default Layout