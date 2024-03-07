import React from 'react'
import NavBar from '@/components/layout/navbar'
import { getServerSession } from 'next-auth'
import  authOptions  from "@/app/auth/authOptions";
import Header from '@/components/layout/issues-header';
import { formatDistance, formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/components/ui/card';
import { ActivityIcon, BarChart, ChevronDownIcon, CreditCardIcon, DollarSignIcon, UsersIcon } from 'lucide-react';
import { Button } from '@radix-ui/themes';
import prisma from 'prisma/client';



const page =  async ( ) =>{
	const session = await getServerSession(authOptions);
   
  const user = await prisma.user.findUnique({
    where: { email: session!.user!.email },
  });
 


  return (
  <>
	<Header session={session} />
 <div className='z-10 flex flex-col w-full min-h-screen'>
  <main className="z-10 flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen ">
    <div>
      <div>
        
        <h1 className="text-xl font-bold tracking-tighter sm:text-xl md:text-xl">Welcome Back, {user?.name}! 
        </h1>
        <p className='text-gray-500 dark:text-gray-500 font-extralight'>
  What would you like to do today? Your last login was on {
    session?.user?.lastLogin ?
    formatDistanceToNow(new Date(session?.user.lastLogin), { addSuffix: true }) :
    '' // Fallback text in case lastLogin is undefined
  }.
</p>
<p> </p>





      </div>
    </div>
    <div className="grid gap-4 md:grid-cols-2 mt-10">
        <Card className='shadow-2xl border-t hover:bg-gray-200'>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 ">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className='shadow-2xl border-b hover:bg-gray-200'>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card className='shadow-2xl border-b hover:bg-gray-200'>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCardIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+19% from last month</p>
          </CardContent>
        </Card>
        <Card className='shadow-2xl border-b hover:bg-gray-200'>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <ActivityIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+201 since last hour</p>
          </CardContent>
        </Card>

        <Card className='shadow-2xl border-b hover:bg-gray-200'>

        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="grid gap-1.5">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CardDescription>This month's sales compared to the previous month.</CardDescription>
            </div>
            <Button className="rounded-full"  variant="outline">
              <ChevronDownIcon className="h-4 w-4" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </CardHeader>
          <CardContent>
            <BarChart className="w-full aspect-[2/1]" />
          </CardContent>
        </Card>
        <Card className='shadow-2xl border-b hover:bg-gray-200'>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="grid gap-1.5">
              <CardTitle className="text-sm font-medium">Traffic</CardTitle>
              <CardDescription>Website traffic for the last 30 days.</CardDescription>
            </div>
            <Button className="rounded-full"  variant="outline">
              <ChevronDownIcon className="h-4 w-4" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </CardHeader>
          <CardContent>
            {/* <CurvedlineChart className="w-[50vw] aspect-[3/2]" /> */}
          </CardContent>
        </Card>
      </div>


  </main>
  </div>
 
   

  
  </>
  )
}

export default page