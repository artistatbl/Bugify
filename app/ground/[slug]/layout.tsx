
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
import CreateIssue from '@/app/ground/[slug]/_components/createIssue';
import ShareGround from './_components/shareGround';

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
	  <div className="z-10 flex flex-col mb-20 w-full pr-5 pl-5 md:pr-5 md:pl-5 lg:pr-10 lg:pl-10 min-h-screen  ">
	    <div className='container max-w-8xl mx-auto pt-12  '>
    
		<ToFeedButton />

		<div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6 border-1 border-red-500 '>
          <ul className='flex flex-col col-span-2 space-y-6'>{children}</ul>

          <div className='overflow-hidden h-fit rounded-lg border-2 border-black dark:border-red-800 bg-gray-200 order-first md:order-last'>
     

	<div className='px-6 py-4 bg-gray-100'>


			<p className='font-semibold py-3 dark:text-black'>About G/{ground?.name ?? 'defaultname'}</p>

	</div>




		   <dl className='divide-y divide-gray-100 dark:divide-gray-700 px-6 py-4 text-sm leading-6 dark:bg-white/100 bg-black/100 text-white'>
			<div className='flex justify-between gap-x-4 py-3 text-white'>
			  <dt className='text-white dark:text-black'>Created</dt>
			  <dd className='text-gray-700'></dd>
			</div>
			<div className='flex justify-between gap-x-4 py-3 '>
			  <dt className='text-white dark:text-black'>Members</dt>
			  <div className='text-white dark:text-black'>{memberCount}</div>
			  <dt className='text-white dark:text-black'>Issues</dt>
			  <dd className='text-white dark:text-black'>{ground?._count?.issues ?? 'Loading...'}</dd>
			</div>
			{ground?.creatorId === session?.user?.id && (
			  <div className='flex justify-between gap-x-4 py-3'>
			   <dt className='text-gray-400 font-extralight'>You created this Ground</dt>
			  </div>
			)}
			{ground?.creatorId !== session?.user?.id && (
			  <SubscribeLeaveToggle
			   isSubscribed={isSubscribed}
			   organizationId={ground.id ?? ''}
			   organizationName={ground.name ?? ''}
			  />
			)}
			

			<div className='flex flex-col md:flex-row gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-5 xl:gap-x-6 gap-y-2 pt-4 text-center justify-center'>
  <CreateIssue organizationId={ground.id ?? ''} />
  <ShareGround name={ground.name ?? ''} slug={ground.name ?? ''} />
  
</div>


		   </dl>
		  </div>
		  </div>

		</div>
	    </div>
	</>
   );

		   
 

		
 };
  
export default Layout;