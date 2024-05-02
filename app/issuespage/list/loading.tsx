import { Table } from '@radix-ui/themes'
import React, { Suspense } from 'react'
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import  authOptions  from "@/app/auth/authOptions";

import { Button } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SideNav from '@/components/issues/SideNav';
import CreateIssue from '@/app/issuespage/_component/CreateIssue';
import IssueActions from './IssueActions';





const LoadingIssuesPage = async () => {

  const session = await getServerSession(authOptions);

	const issues = [1,2,3,4,5,6,7,8,9,10];
  return (
	<>
	
<Suspense fallback="...">
<SideNav {...{ session: session }} />
</Suspense>




      <div className="z-10 flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen ">
       
      


        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold tracking-tighter">Bug Logs</h1>
        

        </div>



<div className="mb-4">

<IssueActions />

	</div>




	   <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
        </div>



      
	  
		</>
  )
}

export default LoadingIssuesPage
