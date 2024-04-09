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
	const ground = await prisma.organization.findUnique({
		where: {
			id: params.id
		},
		include: {
			//grounds: true
			
		}
	});
	if (!ground) return notFound()
	console.log(ground)



  return (
	<>
	<SideNav session={session} />
    
	 
        <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
		{/* <ul className=''> {children}</ul> */}


	   </div>


	

 
	</>
  )
}

export default page