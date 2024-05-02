import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/components/ui/card";
import { Skeleton } from "@/components/components/ui/skeleton";
import SideNav from '@/components/issues/SideNav';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/authOptions';
import prisma from 'prisma/client';
import { formatDistanceToNow } from 'date-fns';

const DashboardLoading = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;  // Adjust according to your session structure
  // console.log(userId)
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return (
    <>
      <SideNav session={session} />
      <div className='z-10 flex flex-col w-full min-h-screen'>
	 <main className="z-10 flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen">
  <h1 className="tracking-tighter mb-4">
    <span className="font-bold text-foreground tracking-tighter text-3xl">Welcome, {session?.user?.name || 'Guest'}!</span>
    <span className="font-extralight"> Last Login: {user?.lastLogin ? `${formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })}` : 'Never logged in'}</span>
  </h1>
  <div className="grid grid-cols-2 md:grid-cols-2 gap-2 sm:gap-5">
    <div className="flex flex-col">
      <Card>
        <CardContent className="p-3 sm:p-5 border-b-4 border-black rounded-md">
          <Skeleton className="h-36 w-full bg-black dark:bg-gray-200"></Skeleton>
        </CardContent>
      </Card>
    </div>
    <div className="flex flex-col">
	 {/* <!-- Adjusted to span across all columns --> */}
      <Card>
        <CardHeader>
          <CardTitle className="tracking-tighter text-left mb-2">Recent Overview</CardTitle>
          <p className="text-sm font-medium text-gray-500 text-left">Get a quick overview of your issues</p>
        </CardHeader>
        <CardContent className="p-3 sm:p-5 border-b-4 border-black rounded-md">
          <Skeleton className="h-56 w-full bg-black dark:bg-gray-200"></Skeleton>
        </CardContent>
      </Card>
    </div>
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle className="tracking-tighter text-left mb-2">Latest Issues</CardTitle>
          <p className="text-sm font-medium text-gray-500 text-left">Get a quick overview of your recent issues</p>
        </CardHeader>
        <CardContent className="p-3 sm:p-5 border-b-4 border-black rounded-md">
          <Skeleton className="h-20 w-full bg-black dark:bg-gray-200"></Skeleton>
          <Skeleton className="h-20 w-full bg-black dark:bg-gray-200 mt-5"></Skeleton>
        </CardContent>
      </Card>
    </div>
  
  </div>
</main>
      </div>
    </>
  );
};

export default DashboardLoading;