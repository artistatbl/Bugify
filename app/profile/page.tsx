// app/profile/page.tsx

import Header from '@/components/layout/issues-header'
import React, { useState } from 'react'
import { getServerSession } from 'next-auth/next'
import authOptions from "@/app/auth/authOptions";
import prisma from 'prisma/client'
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/components/ui/card";
import { Badge } from "@/components/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/components/ui/avatar";
import IssueCard from '@/components/issues/IssueCard';
import { Reorder, useDragControls } from 'framer-motion';
import delay from 'delay';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogTrigger } from '@/components/components/ui/dialog';
import { Button } from '@/components/components/ui/button';
import dynamic from 'next/dynamic';
import CreateGround from './_components/CreateGround';


const page = async () => {




  const session = await getServerSession(authOptions)



  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  // // Function to toggle the dialog visibility
  // const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  const user = await prisma.user.findUnique({
    where: { id: session!.user!.id },
    include: {
      assignedIssues: true,
      accounts: true,
    }
  })
  if (!user) {
    return console.error('User not found');
  }




  await delay(2000);



  return (
    <>
    
      <Header session={session} />
      <div className='z-10 flex flex-col w-full min-h-screen '>
        <main className="flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen ">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5  ">


            <div className="flex flex-col ">
              <Card className="hover:ring-[0.5px] shadow-md ring-foreground duration-500 transition-all">
                <CardHeader
                  className="dark:bg-black/20 bg-gray-200  flex sm:flex-row flex-col-reverse
                justify-between sm:items-center   rounded-md rounded-b-none">
                  <div className="flex flex-col gap-2">
                    <CardTitle>{session?.user?.name}</CardTitle>
                    <CardDescription> User {session?.user?.emailVerified ? 'Verified' : 'Not Verified!'}</CardDescription>

                    <CardDescription className="text-muted-foreground text-gray-700 font-extralight dark:text-white">{session?.user?.email}</CardDescription>
                    <Badge className="bg-gray-700  text-white justify-center">{user.role}</Badge>
                  </div>
                  <div className="sm:pb-0 pb-5 sm:pl-3 pl-0 ">
                    <Avatar className="w-20 h-20 border">
                      <AvatarImage src={session?.user?.image!} />
                      <AvatarFallback className="bg-slate-200 text-slate-800 ">DP</AvatarFallback>
                    </Avatar>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-5 border-b-4 border-b-gray-900 dark:border-gray-200 rounded-md shadow-md  shadow-neutral-900 ">
                  <div className="mt-3 ">
                    <div>
                      {user!.accounts.map(acc => (
                        <div className="flex " key={acc.id}>
                          <div className="flex items-center gap-2 ">
                            <p className="text-sm text-muted-foreground">Account Logged by</p>
                            <ChevronDownIcon />
                            <div className="capitalize font-light">{acc.provider}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='bg-emerald-100 px-6 py-4 mt-4'>
                    <p className='font-semibold py-3 flex items-center gap-1.5 dark:text-black'>

                      <HomeIcon className='w-4 h-4 dark:text-black' /> Home

                    </p>

                  </div>

                  <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 justify-center text-center'>
                    <div className='flex justify-between gap-x-4 py-3'>
                      <p className='text-zinc-500 '>
                        Your personal page. Come here to check in with your
                        favorite communities.
                      </p>
                    </div>

                    <CreateGround />
                  </dl>

                </CardContent>

              </Card>

            </div>
            <Card className="flex flex-col border-b-4 border-b-gray-900 dark:border-gray-200  rounded-md shadow-neutral-950 hover:ring-[0.5px] ring-foreground duration-500 transition-all">
              <CardHeader>
                <CardTitle>Assigned Issues</CardTitle>
                <div className='flex flex-col font-light text-gray-400'>
                  <CardDescription>Here are all the projects assigned to you.</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-3 sm:p-5 ">
                <div className='flex flex-col gap-3 sm:gap-5'>
                  {(user.assignedIssues === null || user.assignedIssues.length === 0) && (
                    <div className="text-gray-500 justify-center text-center">No issues assigned</div>

                  )}
                  {user.assignedIssues && user.assignedIssues.map((issue) => (

                    <IssueCard key={issue.id} issue={issue} />
                  ))}

                </div>

              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )

}



export default page

