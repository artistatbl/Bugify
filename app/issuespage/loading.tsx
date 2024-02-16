import { Table } from '@radix-ui/themes'
import React, { Suspense } from 'react'
import Link from 'next/link';


import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssuesNavBar from '@/components/layout/issuesbar';




const LoadingIssuesPage = () => {

	const issues = [1,2,3,4,5,6,7,8,9,10];
  return (
	<>
	<Suspense fallback="...">
	<IssuesNavBar />
	</Suspense>
	<div className="z-10 flex flex-col w-full pr-5 pl-5 md:pr-10 md:pl-10 lg:pr-20 lg:pl-20 min-h-screen">
    
	<div className="flex items-center gap-4 mb-4">
	  <h1 className="text-3xl font-bold tracking-tighter">Bug Logs</h1>
	  <Link 
	    className="inline-flex items-center h-8 border  text-white rounded-md border-gray-200 bg-white px-3 
	    text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900
	    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 
	    dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50
	    dark:focus-visible:ring-gray-300"
	    href="#"
	    >
	    New Bug
	  </Link>
	</div>
	<div className="">
	  <Table.Root variant="surface">
	    <Table.Header>
		 <Table.Row>
		   <Table.ColumnHeaderCell className='text-center'>ID</Table.ColumnHeaderCell>
		   <Table.ColumnHeaderCell className="hidden md:table-cell text-center">Title</Table.ColumnHeaderCell>
		   <Table.ColumnHeaderCell className="hidden md:table-cell text-center">Status</Table.ColumnHeaderCell>
		   <Table.ColumnHeaderCell className="hidden md:table-cell text-end justify-center">Priority</Table.ColumnHeaderCell>
		 </Table.Row>
	    </Table.Header>
	<Table.Body>
		{issues.map(dashboard => (
			<Table.Row key={dashboard}>
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