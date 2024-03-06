// app/dashboard/page.tsx

import { Button, ScrollArea, Table } from '@radix-ui/themes';
import React, {Suspense } from 'react';
import delay from 'delay';
import Link from 'next/link';
import prisma from 'prisma/client';
import IssueStatusBadge from '@/components/issues/IssuesStatusBadge';
import IssuePriorityBadge from '@/components/issues/IssuesPriorityBadge';
import { getServerSession } from 'next-auth';
import Header from '@/components/layout/issues-header';
import  authOptions  from "@/app/auth/authOptions";



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
          <Header session={session} />
        </Suspense>
  
        <div className="z-10 flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen ">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold tracking-tighter">Bug Logs</h1>
            <Button> <Link href='/issues/new'>New  Bug</Link></Button>
          </div>
          <div className="">
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell className='hidden md:table-cell text-center'>Issues</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className=" text-center">Title</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className=" text-center">Status</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="hidden md:table-cell text-end justify-center">Priority</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {issues.map((issue) => (
                  <Table.Row key={issue.id}>
                    <Table.Cell className='text-center'>
                      <Link href={`/issues/${issue.id}`} legacyBehavior>
                        {`issue-${issue.id}`}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="hidden md:table-cell text-center">
                      {issue.title}
                    </Table.Cell>
                    <Table.Cell className=" text-center">
                      <IssueStatusBadge status={issue.status} />
                    </Table.Cell>
                    <Table.Cell className="hidden md:table-cell text-end justify-center">
                      <IssuePriorityBadge priority={issue.priority} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>
        </div>
      </>
    );
}

export default IssuesPage