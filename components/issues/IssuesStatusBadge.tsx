import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record<
Status,
 { label: string, color: 'red' | 'violet' | 'green' }> = {
	OPEN: { label: 'Open', color: 'red' },
	IN_PROGRESS: { label: 'In Progress', color: 'violet' },
	CLOSED: { label: 'Closed', color: 'green' },
	OVERDUE: { label: 'Overdue', color: 'red' },
	CANCELLED: { label: 'Cancelled', color: 'red' },
	COMPLETED: { label: 'Completed', color: 'green' },
	REOPENED: { label: 'Reopened', color: 'green' },
	NOT_STARTED: { label: 'Not Started', color: 'green' }
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
	return (
		<Badge color={statusMap[status].color}>
			{statusMap[status].label}

		</Badge>
	)
}

export default IssueStatusBadge