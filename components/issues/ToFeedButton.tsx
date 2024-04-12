'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { ChevronLeftIcon } from 'lucide-react'

const ToFeedButton = () => {

	const pathname = usePathname();

	const groundPath = getGroundPath(pathname);


  return (
	<a href={groundPath} className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
	<span className="flex items-center"> {/* Add this line */}
		<ChevronLeftIcon className="w-5 h-5 mr-1" />
		{groundPath === '/issuespage' ? 'All Issues' : 'Issues'}
	</span> {/* Close the span here */}
</a>
   
  )
}

const getGroundPath = (pathname: string) => {

	const groundPath = pathname.split('/issuespage');

	if (groundPath.length === 3) return '/issuespage'
	else if (groundPath.length > 3) return `${groundPath[1]}/${groundPath[2]}`

	else return '/issuespage'



}

export default ToFeedButton

