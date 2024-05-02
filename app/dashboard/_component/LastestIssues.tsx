import React, { useEffect, useState } from 'react';
import prisma from 'prisma/client';
import IssueStatusBadge from '@/components/issues/IssuesStatusBadge';
import IssuePriorityBadge from '@/components/issues/IssuesPriorityBadge';
import { getServerSession } from 'next-auth/next'
import authOptions from "@/app/auth/authOptions";
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/components/ui/card';
import Image from 'next/image';
import { User2Icon, MoreVertical, DeleteIcon } from 'lucide-react';
import UserPopover from '@/components/user/UserPopover';
import AssigneeSelect from '@/app/issues/[id]/_components/AssigneeSelect';
import UserIssueFeatures from '@/components/issues/UserIssueFeatures';
import {
	DropdownMenu, DropdownMenuContent,
	
	DropdownMenuLabel,

	DropdownMenuSeparator,
	
	DropdownMenuTrigger,
} from '@/components/components/ui/dropdown-menu';

import { Button } from '@/components/components/ui/button';
import ViewIssue from '@/app/issues/[id]/_components/ViewIssue';
import DeleteIssueButton from '@/app/ground/[slug]/_components/DeleteissueButton';
import CreateIssue from '@/app/issuespage/_component/CreateIssue';


const LatestIssues = async () => {


	const session = await getServerSession(authOptions);
	const { email, image } = session?.user || {};

	const issues = await prisma.issue.findMany({
		orderBy: { createdAt: 'desc' },
		take: 5,
		include: {
			user: true,
			assignedToUser: true
		},
		where: {
			userId: session?.user?.id, // Use the userId to filter issues
		}
	})


	return (
		<Card className="hover:ring-[0.5px] ring-foreground duration-500  transition-all border-b-8 border-gray-900 dark:border-white ro">
			<CardHeader className="text-center justify-center">
				<CardTitle className=" tracking-tighter text-left mb-2">Latest Issues</CardTitle>
				<p className="text-sm font-medium text-gray-500 text-left">Get a quick overview of your recent issues</p>
			</CardHeader>
			<div className="p-2 md:p-5 xl:p-10">
                {issues.length === 0 ? (
                    <div className="text-center mt-24">
                        <p className="text-xl font-semibold tracking-tighter mb-2 text-center justify-center">No recent issues here yet. create some .</p>
				    <CreateIssue />
                    </div>
                ) : (
			




			<div className="p-2 md:p-5 xl:p-10">
				<div className="grid gap-8 grid-cols-1 sm:grid-cols-1 ">

					{issues.map((issue) => (
						<div key={issue.id} className="bg-white shadow-lg rounded-lg p-4 md:p-6 border border-gray-900 xs:min-w-[200px] sm:min-w-[400px] md:min-w-[600px] lg:min-w-[200px] xl:min-w-[450px] 1xl:min-w-[500px] 2xl:min-w-[600px]">
							<div className='max-h-40 mt-1 text-xs md:text-sm text-gray-500'>

								<span>Logged by u/{issue?.user?.name}</span>{' '}
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


										{issue.assignedToUser ? (
											<div className=" ml-2">

												{issue.assignedToUser && <UserPopover user={issue.assignedToUser!} />}
												{/* <AssigneeSelect issueId={issue.id} organizationId={issue.organizationId || ''} /> */}


											</div>
										) : (
											<div className="">
											</div>
										)}
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

											<ViewIssue
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
		)}
			
			</div>
	

		</Card>

												

	);
};

export default LatestIssues;
