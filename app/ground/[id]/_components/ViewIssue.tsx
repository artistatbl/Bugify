import React, { Suspense } from 'react';
import Link from 'next/link';
import prisma from 'prisma/client';
import IssueStatusBadge from '@/components/issues/IssuesStatusBadge';
import IssuePriorityBadge from '@/components/issues/IssuesPriorityBadge';
import { getServerSession } from 'next-auth';
import authOptions from "@/app/auth/authOptions";

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
       
          <p className="text-xl font-bold tracking-tighter mt-20 text-center justify-center">No issues found for this organizationn.</p>
    
      );
    }

    return (
      <div className="p-2 md:p-5 lg:p-5">
        <div className="flex items-center gap-4 ">
          <h1 className="text-3xl font-bold tracking-tighter mb-10">Bug Logs</h1>
          {/* Consider uncommenting or modifying this button if needed */}
          {/* <Button> <Link href='/issues/new'>New Issue</Link></Button> */}
        </div>

        <div className="grid gap-8 min-w-[400px] md:grid grid-cols-1 border border-black p-2 ">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-4 md:grid-cols-4 gap-6 border border-gray-900">
              <div className="md:col-span-4">
                <h3 className="font-semibold">{issue.title}</h3>
              </div>
              <div className="md:col-span-1 flex items-center justify-center">
                <IssueStatusBadge status={issue.status} />
              </div>
              <div className="md:col-span-1 flex items-center justify-center">
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