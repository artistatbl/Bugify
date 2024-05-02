import Pagination from '@/components/issues/Pagination';
import prisma from '../../../prisma/client';
import { Status } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/auth/authOptions';
import { Suspense } from 'react';
import SideNav from '@/components/issues/SideNav';
import delay from 'delay';
interface Props {
  searchParams: IssueQuery
}



const IssuesPage = async ({ searchParams }: Props) => {



  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;


  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status, userId };

  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;
  

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy:{
      createdAt: 'desc',
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  await delay(1000);

  return (
    <>
    <Suspense fallback="...">
      <SideNav session={session}/>
      </Suspense>
         <div className="z-10 flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen ">

    <div className="flex items-center gap-4 mb-4">
      <p className="text-3xl font-bold tracking-tighter">Bug Logs</p>
    </div>
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
        />
    </Flex>
    </div>
        </>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
};

export default IssuesPage;