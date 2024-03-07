import Header from '@/components/layout/issues-header'
import React from 'react'
import { getServerSession } from 'next-auth/next'
import  authOptions  from "@/app/auth/authOptions";
import prisma from 'prisma/client'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/components/ui/card";
import {Badge} from "@/components/components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/components/ui/avatar";


const page =  async () => {

const session =  await getServerSession(authOptions)
const user = await prisma.user.findUnique(
  {where: {id: session?.user?.id}})






  return (
    <>
    <Header session={session} />
    <div className='z-10 flex flex-col w-full min-h-screen'>
    <main className="z-10 flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen ">

   

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 ">
        <div className="flex flex-col">
          <Card>
            <CardHeader
                className="dark:bg-accent bg-accent flex sm:flex-row flex-col-reverse
                justify-between sm:items-center  rounded-md rounded-b-none">
              <div className="flex flex-col gap-2">
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
                <Badge className="w-20 justify-center">{user?.role}</Badge>
              </div>
              <div className="sm:pb-0 pb-5 sm:pl-3 pl-0">
                <Avatar className="w-20 h-20 border">
                  <AvatarImage src={user?.image!}/>
                  <AvatarFallback className="bg-slate-200 text-slate-800">DP</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-3">
                {/* <div>
                  {user.accounts.map(acc => (
                      <div className="flex" key={acc.id}>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">Account Logged by</p>
                          <ChevronRightIcon/>
                          <div className="capitalize">{acc.provider}</div>
                        </div>
                      </div>
                  ))}
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>My Projects</CardTitle>
            <CardDescription>Here are all the projects assigned to you.</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-5">
            {/* <div className="flex flex-col gap-3 sm:gap-5">
              {!user.assignedProjects || user.assignedProjects.length === 0 && (
                  <div className="flex  self-center pb-5">Currently there are no projects assigned to you.</div>
              )}
              {user.assignedProjects.map(project => (
                  <ProjectCard key={project.id} project={project}/>
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