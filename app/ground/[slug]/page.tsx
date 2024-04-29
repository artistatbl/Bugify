import React from 'react'
import SideNav from '@/components/issues/SideNav'
import { getServerSession } from 'next-auth/next'
import  authOptions  from "@/app/auth/authOptions";
import prisma from 'prisma/client'
import { notFound } from 'next/navigation';
import ViewIssue from '@/app/ground/[slug]/_components/ViewIssue';


interface Props {
	params: {
		slug: string;
	};	
}

const page =  async ( { params }: Props) => {
    const {slug} = params
	
	const ground = await prisma.organization.findFirst({
		where: {
			name: slug,
		},
		include: {
			issues: true
		}
	})
	



  return (
	<>
	
     <h1 className='font-bold text-3xl md:text-4xl h-14'>
	   G/{ground?.name ?? ''}
      </h1>
<ViewIssue params={{ slug: ground?.name ?? '' }}/>


    </>
	 
      


	

 
	
  )
}

export default page