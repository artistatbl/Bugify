
import { Button, ScrollArea, Table } from '@radix-ui/themes';
import React, {Suspense } from 'react';
import delay from 'delay';
import Link from 'next/link';
import prisma from 'prisma/client';
import IssueStatusBadge from '@/components/issues/IssuesStatusBadge';
import IssuePriorityBadge from '@/components/issues/IssuesPriorityBadge';
import { getServerSession } from 'next-auth';
import  authOptions  from "@/app/auth/authOptions";
// import ViewIssue from '../../../issues/[id]/_components/ViewIssue';
import { Dialog, DialogTrigger } from '@/components/components/ui/dialog';
import SideNav from '@/components/issues/SideNav';
import Image from 'next/image';
import EditorOutput from '@/components/issues/EditorOutput';

interface ViewIssueProps {
  organizationId: string;
}

const ViewIssue = async ({ organizationId }: ViewIssueProps) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    //toast.error('You must be logged in to view issues.');
    return null;
  }

  try {
    const issues = await prisma.issue.findMany({
      where: {
        organizationId: organizationId,
      },
      include: {
        user: true,
      },
    });

    if (issues.length === 0) {
      return (
        <div className="text-center p-10">
        
          <p>No issues found for this organization.</p>
        </div>
      );
    }

    return (
     <div className="z-10 flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen ">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold tracking-tighter">Bug Logs</h1>
            {/* <Button> <Link href='/issues/new'>New here Bug</Link></Button> */}
          </div>


          
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell className='text-center'>title</Table.ColumnHeaderCell>

                  <Table.ColumnHeaderCell className=" hidden md:table-cell text-center">status</Table.ColumnHeaderCell>

                  <Table.ColumnHeaderCell className="hidden md:table-cell  text-justify justify-items-center ">Priority</Table.ColumnHeaderCell>

                  <Table.ColumnHeaderCell className="flex items-center  justify-end ">Issue</Table.ColumnHeaderCell>


                </Table.Row>
              </Table.Header>


              <Table.Body>

              {issues.map((issue) => (
  <Table.Row key={issue.id}>
   
    <Table.Cell className="text-center">
      {issue.title}
    </Table.Cell>

    <Table.Cell className="text-center hidden md:table-cell ">
      <IssueStatusBadge status={issue.status} />
    </Table.Cell>
    <Table.Cell className="hidden md:table-cell">
      <IssuePriorityBadge priority={issue.priority} />
    </Table.Cell>
    <Table.Cell className='text-end justify-center ' >
      <div className="flex items-end justify-end gap-2">
        {/* <ViewIssue
          params={{
            id: issue.id,
          }}
        /> */}
        {/* <Image alt="User Avatar" src={image || `https://ui-avatars.com/api/?name=${email}.svg`} 
          className='rounded-full mb-1 hidden md:table-cell'
          width={25} height={25} /> */}
      </div>
    </Table.Cell>

  </Table.Row>
))}


              </Table.Body>

              
            </Table.Root>
          </div>
    );
  } catch (error) {
    console.error('Error fetching issues:', error);
    //toast.error('Failed to load issues.');
    return null;
  }
};

export default ViewIssue;