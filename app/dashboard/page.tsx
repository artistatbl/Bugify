import React from 'react'
import NavBar from '@/components/layout/navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Header from '@/components/layout/issues-header';

const page =  async ( ) =>{
	const session = await getServerSession(authOptions);

  return (
  <>
	<Header session={null} />
    <div>dashboard</div>
  </>
  )
}

export default page