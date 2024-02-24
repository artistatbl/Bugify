import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import React from 'react'

const page = async () => {
 

  return (
    <div>page</div>
  )
}

export default page;