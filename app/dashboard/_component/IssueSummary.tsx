'use client';
import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Circle, Activity, CheckCircle } from 'lucide-react';
import styled from 'styled-components';


interface Issue {
	id: string;
	title: string;
	status: Status;
}

interface IssueSummaryProps {
  open: number;
  inProgress: number;
  closed: number;
  userId: string;
}
const IssueSummary: React.FC<IssueSummaryProps> = ({ open, inProgress, closed, userId }) => {
	const [issues, setIssues] = useState<Issue[]>([]);
   
	useEffect(() => {
	  fetch(`/api/issues?userId=${userId}`)
	    .then(response => response.json())
	    .then(data => setIssues(data))
	    .catch(error => console.error('Failed to load issues', error));
	}, [userId]);
   
	const total = open + inProgress + closed;
   
	const containers = [
	{ label: 'Open Issues', value: open, status: 'OPEN', icon: <div style={{}}><Circle size={20} color="red" /></div> },

	  { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS', icon: <Activity size={20} color="orange" /> },
	  { label: 'Closed Issues', value: closed, status: 'CLOSED', icon: <CheckCircle size={20} color="green" /> },
	  { label: 'Total Issues', value: total }
	];

	const ResponsiveFlex = styled(Flex)`
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
   
	return (
		<ResponsiveFlex gap="4">
		  {containers.map((container) => (
		    <Card key={container.label}>
			 <Flex direction="column" gap="2">
			   <Flex align="center" gap="2">
				{container.status ? (
				  <Link
				    className='text-sm font-medium'
				    href={`/issues/list?status=${container.status}`}
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
		</ResponsiveFlex>
	   );
	 };
	 
	 export default IssueSummary;