import { Priority } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const priorityMap: Record<
Priority,	
 { label: string, color: 'red' | 'orange' | 'blue' | 'green' | 'purple' }> = {
	LOW: { label: 'Low', color: 'green' },
	MEDIUM: { label: 'Medium', color: 'blue' },
	HIGH: { label: 'High', color: 'red' },
	MORNAL: { label: 'Mornal', color: 'purple' },
	CRITICAL: { label: 'Critical', color: 'red' }
}

const IssuePriorityBadge = ({ priority }: { priority: Priority }) => {
	return (
		<Badge color={priorityMap[priority].color}>
			{priorityMap[priority].label}

		</Badge>
	)
}

export default IssuePriorityBadge