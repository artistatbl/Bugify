import React, { Suspense } from 'react';
import prisma from 'prisma/client';
import IssueStatusBadge from '@/components/issues/IssuesStatusBadge';
import IssuePriorityBadge from '@/components/issues/IssuesPriorityBadge';
import { getServerSession } from 'next-auth';
import authOptions from "@/app/auth/authOptions";
import EditorOutput from '@/components/issues/EditorOutput';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/components/ui/card';

import { ScrollArea } from "@/components/components/ui/scroll-area"

interface ViewIssueProps {
  params: {
    slug: string;
  }

}

const ViewIssue = async ({ params }: ViewIssueProps) => {
  const { slug } = params

  const session = await getServerSession(authOptions);
  if (!session) {
    //toast.error('You must be logged in to view issues.');
    return null;
  }

  try {
    const issues = await prisma.issue.findMany({
      where: {
        organization: {
          name: slug
        }
      },
      include: {
        user: true,
        _count: true,
        organization: true
      },
    });

    if (issues.length === 0) {
      return (
       
          <p className="text-xl font-bold tracking-tighter mt-72 text-center justify-center">No issues found for this organizationn.</p>
    
      );
    }

    return (
      <Card  className="hover:ring-[0.5px] ring-foreground duration-500  transition-all">
        <CardHeader className="text-center justify-center">
          <CardTitle>Issues</CardTitle>
        </CardHeader>

        <ScrollArea className="h-[450px] md:h-[580px] w-full rounded-md border border-black">


    
         <div className="p-2 md:p-5 xl:p-10">
  <div className="grid gap-8 grid-cols-1 sm:grid-cols-1 ">

    {issues.map((issue) => (
      <div key={issue.id} className="bg-white shadow-lg rounded-lg p-4 md:p-6 border border-gray-900 xs:min-w-[300px] sm:min-w-[620px] md:min-w-[470px] lg:min-w-[600px] xl:min-w-[725px] 2xl:min-w-[900px]">
        <div className='max-h-40 mt-1 text-xs md:text-sm text-gray-500'>
          {issue.organization?.name ? (
            <>
              <a
                className='underline text-zinc-900 underline-offset-2'
                href={`/ground/${issue.organization.name}`}>
                r/{issue?.organization?.name}
              </a>
              <span className='px-1'>•</span>
            </>
          ) : null}
          <span>Logged by u/{issue?.user?.name}</span>{' '}
          {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
        </div>

        <div className="flex flex-col md:flex-row justify-between">
        <Link href={`/issues/${issue.id}`}>
        <h3 className="font-semibold text-base md:text-lg">{issue.title}</h3>

               
               </Link>
          <div className="flex items-center justify-between mt-2 md:mt-0">
            <div className="flex items-center">
              <p className="text-sm font-medium text-gray-900 mr-2">Status</p>
             
                              <IssueStatusBadge status={issue.status} />

            </div>
            <div className="flex items-center ml-4">
              <p className="text-sm font-medium text-gray-900 mr-3">Priority</p>
              <div className='mb-2'> 


              <IssuePriorityBadge priority={issue.priority} />
              </div>
            </div>

          </div>

        </div>
      </div>
    ))}
  </div>
</div>
</ScrollArea>
      </Card>
    );
  } catch (error) {
    console.error('Error fetching issues:', error);
    //toast.error('Failed to load issues.');
    return null;
  }
};

export default ViewIssue;