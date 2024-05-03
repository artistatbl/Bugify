import React, { Suspense } from 'react';
import prisma from 'prisma/client';
import IssueStatusBadge from '@/components/issues/IssuesStatusBadge';
import IssuePriorityBadge from '@/components/issues/IssuesPriorityBadge';
import { getServerSession } from 'next-auth';
import authOptions from "@/app/auth/authOptions";
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {Card,CardHeader, CardTitle} from '@/components/components/ui/card';
import { MoreVertical } from 'lucide-react';

import { ScrollArea } from "@/components/components/ui/scroll-area"
import UserIssueFeatures from '@/components/issues/UserIssueFeatures';
import {
	DropdownMenu, DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/components/ui/dropdown-menu';

import ViewIssues from '@/app/issues/[id]/_components/ViewIssue';
import DeleteIssueButton from '@/app/ground/[slug]/_components/DeleteissueButton';

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
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (issues.length === 0) {
      return (
       
          <p className="text-xl font-bold tracking-tighter mt-72 text-center justify-center">No issues found for this organization.</p>
    
      );
    }

    return (
      <Card  className="hover:ring-[0.5px] ring-foreground duration-500  transition-all">
        <CardHeader className="text-center justify-center">
          <CardTitle>Issues</CardTitle>
        </CardHeader>

        <ScrollArea className="h-[450px] md:h-[580px]  bg-gray-200 rounded-md border border-black dark:border-white m-2">


    
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
  <h3 className="font-semibold text-base md:text-lg dark:text-black">
    {issue.title.length > 25 ? `${issue.title.slice(0, 25)}...` : issue.title}
  </h3>
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
            <DropdownMenu>
										<DropdownMenuTrigger asChild>
											<MoreVertical />

										</DropdownMenuTrigger>
										<DropdownMenuContent className="w-56 text-sm pl-3">
											<DropdownMenuLabel>Edit</DropdownMenuLabel>
											<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-0 px-4 rounded">
											<UserIssueFeatures issue={{ ...issue, description: String(issue?.description) }} />
											</button>

											<DropdownMenuSeparator />
											<DropdownMenuLabel >Issue</DropdownMenuLabel>
											<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-0 px-4 rounded">

											<ViewIssues
												params={{
													id: issue.id,
												}}
												/>
												</button>
												
												<button className="bg-red-500 hover:bg-red-600 text-white font-bold py-0.5 px-3 rounded mt-2">
													<DeleteIssueButton issueId={issue.id} />
												</button>

											<DropdownMenuSeparator />





										</DropdownMenuContent>



									</DropdownMenu>

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