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
      <div className="p-2 md:p-5 lg:p-5">
     

        <div className="grid gap-8 md:grid grid-cols-1  ">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-8 md:grid-cols-1 gap-6 border border-gray-900">

<div className='max-h-40 mt-1 text-xs text-gray-500'>
            {issue.organization?.name ? (
              <>
                <a
                  className='underline text-zinc-900 text-sm underline-offset-2'
                  href={`/ground/${issue.organization.name}`}>
                  r/{issue?.organization?.name}
                </a>
                <span className='px-1'>•</span>
              </>
            ) : null}
            <span>Logged by u/{issue?.user?.name}</span>{' '}
            {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}

          </div>

              <div className="md:col-span-4 flex">


                <h3 className="font-semibold">{issue.title}</h3>
              </div>
              <div className="md:col-span-1 flex items-center justify-center">
              <p className="text-sm font-medium text-gray-900 mr-2">Status</p>

                <Link href={`/issuespage/${issue.id}`}>
                <IssueStatusBadge status={issue.status} />
                </Link>
              </div>
              <div className="md:col-span-1 flex items-center justify-center">
                <p className="text-sm font-medium text-gray-900 mr-3 mt-2">Priority</p>
                <IssuePriorityBadge priority={issue.priority} />
              </div>
              <div className="md:col-span-1 flex items-center justify-end">
                {/* Consider adding actionable items or details here */}
                <span>Details</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching issues:', error);
    //toast.error('Failed to load issues.');
    return null;
  }
};

export default ViewIssue;