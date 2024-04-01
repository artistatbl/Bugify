// app/dashboard/page.tsx

import { Button, ScrollArea, Table } from '@radix-ui/themes';
import React, {Suspense } from 'react';
import delay from 'delay';
import Link from 'next/link';
import prisma from 'prisma/client';
import IssueStatusBadge from '@/components/issues/IssuesStatusBadge';
import IssuePriorityBadge from '@/components/issues/IssuesPriorityBadge';
import { getServerSession } from 'next-auth';
import  authOptions  from "@/app/auth/authOptions";
import CreateIssue from './_component/CreateIssue';
import ViewIssue from '../issues/[id]/_components/ViewIssue';
import { Dialog, DialogTrigger } from '@/components/components/ui/dialog';
import SideNav from '@/components/issues/SideNav';



const IssuesPage = async () => {

    const session = await getServerSession(authOptions);
  
  
  
    console.log("Logged in user:", session?.user?.id);
  
    const issues = await prisma.issue.findMany({
      where: {
        userId: session?.user?.id, // Use the userId to filter issues
      }
    });
  
    await delay(800);
  
    return (
      <>
        <Suspense fallback="...">
          <SideNav session={session} />
        </Suspense>

      
  
        <div className="z-10 flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen ">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold tracking-tighter">Bug Logs</h1>
            {/* <Button> <Link href='/issues/new'>New here Bug</Link></Button> */}
            <CreateIssue />
          </div>


          
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell className='text-center'>title</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className=" hidden md:table-cell text-center">status</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="hidden md:table-cell  text-justify justify-items-center ">Priority</Table.ColumnHeaderCell>

                  <Table.ColumnHeaderCell className="text-center justify-center">Issue</Table.ColumnHeaderCell>

                </Table.Row>
              </Table.Header>


              <Table.Body>

                {issues.map((issue) => (
                  <Table.Row key={issue.id}>
                   
                    <Table.Cell className=" text-center">
                      {issue.title}
                    </Table.Cell>
                    <Table.Cell className=" text-center hidden md:table-cell ">
                      <IssueStatusBadge status={issue.status} />
                    </Table.Cell>
                    <Table.Cell className="hidden md:table-cell">
                      <IssuePriorityBadge priority={issue.priority} />
                    </Table.Cell>
                   

                    <Table.Cell className=' text-center justify-center'>
                  
                 <ViewIssue
                   params={{
                     id: issue.id,
                   }}
                 />
               </Table.Cell>
                   
                  </Table.Row>
                ))}
              </Table.Body>

              
            </Table.Root>
          </div>
      
      </>
    );
}

export default IssuesPage