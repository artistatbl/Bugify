import React from 'react'
import SideNav from '@/components/issues/SideNav'
import { getServerSession } from 'next-auth/next'
import  authOptions  from "@/app/auth/authOptions";
import prisma from 'prisma/client'
import { notFound } from 'next/navigation';


interface Props {
	params: {
		id: string;
	};	
}

const page =  async ( { params }: Props) => {

	const session = await getServerSession(authOptions)
	
	const issues = await prisma.issue.findMany({
		where: {
			organizationId: params.id
		},
		include: {
			user: true
		}
	})
	



  return (
	<>
	<SideNav session={session} />
    
	 
        <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>

		<div className='col-span-2'>
			<p> {issues.length} issues </p>

		</div>
		


	   </div>


	

 
	</>
  )
}

export default page