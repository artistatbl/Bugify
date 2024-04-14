
import { getServerSession } from 'next-auth/next'
import authOptions from "@/app/auth/authOptions";
import React from 'react'; 
import Sidebar from '@/components/issues/SideNav';
import Link from 'next/link';
import prisma from 'prisma/client';
import SubscribeLeaveToggle from '@/components/ground/SubscribeLeaveToggle';
import { notFound } from 'next/navigation';
import ViewIssue from '@/app/ground/[slug]/_components/ViewIssue';
import ToFeedButton from '@/components/issues/ToFeedButton';
import { useEffect } from 'react';

// Ensure React is imported for JSX

const Layout = async ( { children, params: { slug } }: { children: React.ReactNode, params: { slug: string } }) => {

	
  const session = await getServerSession(authOptions);

  const ground = await prisma.organization.findFirst({
	where: { name: slug },
	include: {
	  issues: {
	    include: {
		 user: true,
	    },
	  },
	  _count: {
	    select: {
		 issues: true, // Count the issues here
	    }
	  }
	}
   })
 
  const subcription = !session?.user ? undefined : await prisma.subscription.findFirst({
    where: {
	  organization: {
		  name: ground?.name
	  },
	  user: {
		  id: session.user.id
	  }
    }
  })

  const isSubscribed = !!subcription

  if (!ground) return notFound()

  const memberCount = await prisma.subscription.count({
    where: {
	 organization: {
	  name: ground?.name
	 }
    }
  })

  
 
		
  
  return (
	<>
	  <Sidebar session={session} />
	  <div className="z-10 flex flex-col mb-20 w-full pr-5 pl-5 md:pr-5 md:pl-5 lg:pr-10 lg:pl-10 min-h-screen bg-white/100 ">
	    <div className='container max-w-8xl mx-auto pt-12 bg-white/80 '>
    
		<ToFeedButton />

		<div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
          <ul className='flex flex-col col-span-2 space-y-6'>{children}</ul>

          <div className='overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last'>
     

	<div className='px-6 py-4'>


			<p className='font-semibold py-3 dark:text-white'>About r/{ground?.name ?? 'defaultname'}</p>

	</div>




		   <dl className='divide-y divide-gray-100 dark:divide-gray-700 px-6 py-4 text-sm leading-6 dark:bg-white/100 bg-black/100 text-white'>
			<div className='flex justify-between gap-x-4 py-3 text-white'>
			  <dt className='text-white dark:text-black'>Created</dt>
			  <dd className='text-gray-700'></dd>
			</div>
			<div className='flex justify-between gap-x-4 py-3 '>
			  <dt className='text-white dark:text-black'>Members</dt>
			  <div>{memberCount}</div>
			  <dt className='text-white dark:text-black'>Issues</dt>
			  <dd className='text-white dark:text-black'>{ground?._count?.issues ?? 'Loading...'}</dd>
			</div>
			{ground?.creatorId === session?.user?.id && (
			  <div className='flex justify-between gap-x-4 py-3'>
			   <dt className='text-gray-500'>You created this community</dt>
			  </div>
			)}
			{ground?.creatorId !== session?.user?.id && (
			  <SubscribeLeaveToggle
			   isSubscribed={isSubscribed}
			   organizationId={ground.id ?? ''}
			   organizationName={ground.name ?? ''}
			  />
			)}
			<Link
			  className='block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
			  href={`issues/${ground?.name}`}>
			  Create Post
			</Link>
		   </dl>
		  </div>
		  </div>

		</div>
	    </div>
	</>
   );

		   
 

		
 };
  
export default Layout;