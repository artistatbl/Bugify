import Header from '@/components/layout/issues-header'
import React from 'react'
import { getServerSession } from 'next-auth/next'
import  authOptions  from "@/app/auth/authOptions";
import prisma from 'prisma/client'
import {ChevronDownIcon} from '@radix-ui/react-icons';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/components/ui/card";
import {Badge} from "@/components/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/components/ui/avatar";
import IssueCard from '@/components/issues/IssueCard';
import delay from 'delay';

const page =  async () => {

  const session =  await getServerSession(authOptions)

  // check if session is null
  if (session === null) {
    console.error('Unable to fetch session.')
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    include: {
      assignedIssues: true,
      accounts: true,
    }
  })

  // check if user is null
  if (user === null) {
    console.error('Unable to fetch user.')
    return null
  }

  await delay(2000);

  return (
    <>
    <Header session={session} />
    <div className='z-10 flex flex-col w-full min-h-screen'>
    <main className="flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen ">

   

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 ">
        <div className="flex flex-col">
          <Card>
            <CardHeader
                className="dark:bg-gray-400 bg-gray-200 flex sm:flex-row flex-col-reverse
                justify-between sm:items-center   rounded-md rounded-b-none">
              <div className="flex flex-col gap-2">
                <CardTitle>{user.name}</CardTitle>
                <CardDescription> User {user.emailVerified ? 'Verified' : 'Not Verified!'}</CardDescription>

                <CardDescription className="text-muted-foreground text-gray-700 font-extralight">{user.email}</CardDescription>
                <Badge className="bg-gray-700  text-white justify-center">{user.role}</Badge>
              </div>
              <div className="sm:pb-0 pb-5 sm:pl-3 pl-0 ">
                <Avatar className="w-20 h-20 border">
                  <AvatarImage src={user.image!}/>
                  <AvatarFallback className="bg-slate-200 text-slate-800 ">DP</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-5 border-b-4 border-b-gray-900 dark:border-gray-200 rounded-md shadow-md  shadow-neutral- hover:bg-slate-500">
              <div className="mt-3 ">
                <div>
                  {user.accounts.map(acc => (
                      <div className="flex border-b border-b-gray-900" key={acc.id}>
                        <div className="flex items-center gap-2 ">
                          <p className="text-sm text-muted-foreground">Account Logged by</p>
                          <ChevronDownIcon/>
                          <div className="capitalize font-light">{acc.provider}</div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="flex flex-col justify-center text-center border-b-4 border-b-gray-900 dark:border-gray-200 shadow-md rounded-md shadow-neutral-950 hover:bg-slate-50 ">
          <CardHeader>
            <CardTitle>Assigned Issues</CardTitle>
            <div className='flex flex-col font-light text-gray-400'>

            <CardDescription>Here are all the projects assigned to you.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-5">
            {/* <div className="flex flex-col gap-3 sm:gap-5">
              {(user.assignedIssues === null || user.assignedIssues.length === 0) && (
                  <div className="flex  self-center pb-5">Currently there are no projects assigned to you.</div>
              )}
              {user.assignedIssues.map(issue => (
                   <IssueCard key={issue.id} issue={issue}/>
              ))}
            </div> */}
          </CardContent>
        </Card>
      </div>


    </main>
    </div>
    </>
  )

}
export default page