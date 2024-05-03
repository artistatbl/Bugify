'use client';
import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Circle, Activity, CheckCircle, Clock, XCircle, RotateCcw, Play } from 'lucide-react';
import styled from 'styled-components';
import { ScrollArea, ScrollBar } from '@/components/components/ui/scroll-area';


interface Issue {
	id: string;
	title: string;
	status: Status;
}

interface IssueSummaryProps {
  open: number;
  inProgress: number;
  closed: number;
  overdue: number;
  completed: number;
  cancelled: number;
  reopened: number;
  notStarted: number;
  userId: string;
}
const IssueSummary: React.FC<IssueSummaryProps> = ({ open, inProgress, closed, overdue, completed, cancelled, reopened, notStarted, userId }) => {
	const [issues, setIssues] = useState<Issue[]>([]);
   
	useEffect(() => {
	  fetch(`/api/issues?userId=${userId}`)
	    .then(response => response.json())
	    .then(data => setIssues(data))
	    .catch(error => console.error('Failed to load issues', error));
	}, [userId]);
   
	const total = open + inProgress + closed + overdue + completed + cancelled + reopened + notStarted;
   
	const containers = [
	  { label: 'Open Issues', value: open, status: 'OPEN', icon: <Circle size={20} color="red" /> },
	  { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS', icon: <Activity size={20} color="orange" /> },
	  { label: 'Closed Issues', value: closed, status: 'CLOSED', icon: <CheckCircle size={20} color="green" /> },
	  { label: 'Overdue Issues', value: overdue, status: 'OVERDUE', icon: <Clock size={20} color="purple" /> },
	  { label: 'Completed Issues', value: completed, status: 'COMPLETED', icon: <CheckCircle size={20} color="blue" /> },
	  { label: 'Cancelled Issues', value: cancelled, status: 'CANCELLED', icon: <XCircle size={20} color="grey" /> },
	  { label: 'Reopened Issues', value: reopened, status: 'REOPENED', icon: <RotateCcw size={20} color="magenta" /> },
	  { label: 'Not Started Issues', value: notStarted, status: 'NOT_STARTED', icon: <Play size={20} color="yellow" /> },
	  { label: 'Total Issues', value: total }
	];


   
	return (
		
		<ScrollArea className='w-full  whitespace-nowrap rounded-md border'>
		<Flex>
		  {containers.map((container) => (
		    <Card key={container.label} className='w-full m-2 p-2 h-28'>
			 <Flex direction="column" gap="2">
			   <Flex align="center" gap="2" className='justify-between w-full'>
				{container.status ? (
				  <Link
				    className='text-sm font-medium'
				    href={`/issuespage/list?status=${container.status}`}
				  >
				    {container.label}
				  </Link>
				) : (
				  <Text size="3" className='text-sm font-medium'>{container.label}</Text>
				)}
				{container.icon}
			   </Flex>
			   <Text size="5" className='font-bold'>{container.value}</Text>
			 </Flex>
		    </Card>
		  ))}
		</Flex>
		<ScrollBar orientation='horizontal'/>
		</ScrollArea>
	   );
	 };
	 
	 export default IssueSummary;