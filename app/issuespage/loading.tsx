import { Table } from '@radix-ui/themes'
import React, { Suspense } from 'react'
import Link from 'next/link';

import { Button } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssuesNavBar from '@/components/layout/issuesbar';




const LoadingIssuesPage = () => {

	const issues = [1,2,3,4,5,6,7,8,9,10];
  return (
	<>
	
<Suspense fallback="...">
<IssuesNavBar {...{ session: null }} />
</Suspense>




      <div className="z-10 flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen ">
       
      


        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold tracking-tighter">Bug Logs</h1>
        
          <Button > <Link href={"/issues/new"}> </Link>New Bug</Button>
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
                <Table.Row key={issue}>
                  <Table.Cell>
					<Skeleton className='w-32 h-5' />
					<div className='block: md:hidden text-end '>
					<Skeleton className='w-32 h-5' />

					</div>
				</Table.Cell>
				<Table.Cell className='hidden md:table-cell'>
				<Skeleton className='w-32 h-5' />

				</Table.Cell>
				<Table.Cell className='hidden md:table-cell'>
				<Skeleton className='w-32 h-5' />
				</Table.Cell>

				<Table.Cell className='hidden md:table-cell'>
				<Skeleton className='w-32 h-5' />
				</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>



      </div>
	  
		</>
  )
}

export default LoadingIssuesPage


