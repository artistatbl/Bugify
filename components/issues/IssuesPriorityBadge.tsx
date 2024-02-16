import { Priority } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const priorityMap: Record<
Priority,	
 { label: string, color: 'red' | 'orange' | 'blue' }> = {
	LOW: { label: 'Low', color: 'blue' },
	MEDIUM: { label: 'Medium', color: 'orange' },
	HIGH: { label: 'High', color: 'red' }
}

const IssuePriorityBadge = ({ priority }: { priority: Priority }) => {
	return (
		<Badge color={priorityMap[priority].color}>
			{priorityMap[priority].label}

		</Badge>
	)
}

export default IssuePriorityBadge