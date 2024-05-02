'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
const statuses: { label: string; value?: Status | 'ALL' }[] = [
	{ label: 'All', value: 'ALL' },  // Assign 'ALL' as a value to represent no filter
	{ label: 'Open', value: 'OPEN' },
	{ label: 'In Progress', value: 'IN_PROGRESS' },
	{ label: 'Closed', value: 'CLOSED' },
	{ label: 'Reopened', value: 'REOPENED' },
	
   ];
   
   const IssueStatusFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
   
	return (
	  <Select.Root
	    defaultValue={searchParams.get('status') || 'ALL'}  // Set default value to 'ALL'
	    onValueChange={(status) => {
		 const params = new URLSearchParams();
		 if (status !== 'ALL') params.append('status', status);  // Only add 'status' to params if it's not 'ALL'
		 if (searchParams.get('orderBy'))
		   params.append('orderBy', searchParams.get('orderBy')!);
   
		 const query = params.size ? '?' + params.toString() : '';
		 router.push('/issuespage/list' + query);
	    }}
	  >
	    <Select.Trigger placeholder="Filter by status..." />
	    <Select.Content>
		 {statuses.map((status) => (
		   <Select.Item
			key={status.value}
			value={status.value || 'ALL'}  // Ensure no Select.Item has an empty value
		   >
			{status.label}
		   </Select.Item>
		 ))}
	    </Select.Content>
	  </Select.Root>
	);
   };
   
   export default IssueStatusFilter;