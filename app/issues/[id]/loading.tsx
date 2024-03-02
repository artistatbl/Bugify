

import { Card, Flex, Heading, Text, TextField, TextFieldRoot } from '@radix-ui/themes';
import { Label } from '@/components/components/ui/label';
import { Input } from '@/components/components/ui/input';
import { Button } from '@/components/components/ui/button';
import Skeleton from 'react-loading-skeleton';






const LoadingIssuesDetailPage =  () => {

  return (
    <>
 


      <div className="z-10 mx-auto max-w-6xl px-10 sm:px-8  md:px-10 lg:px-14 xl space-y-10 ">
        <div className="space-y-2">
		<Skeleton width="18rem" height="2rem" />
		<Skeleton width="18rem" height="2rem" />
        </div>


        <div className="grid gap-4 md:grid-cols-1">
          <div className="">
		<Skeleton width="18rem" height="2rem" />
          </div>



          <div className=" space-x-16">
            <Label className='text-1xl font-bold tracking-tighter sm:text-lg' htmlFor="status">Status</Label>



            <Skeleton width="18rem" height="2rem"/>

          </div>

          <div className='space-x-16'>
            <Label className='text-1xl font-bold tracking-tighter sm:text-lg' htmlFor="priority">Priority</Label>
		  <Skeleton width="18rem"  height="2rem"/>
          </div>
          <div className='space-x-10'>
            <Label className='text-1xl font-bold tracking-tighter sm:text-lg font' htmlFor="assignee">Assignee</Label>

            {/* <p> {issue.assignedToUserId}</p> */}
           {/* <Text className=' text-gray-500 dark:text-gray-500'>{issue.assignedToUserId}</Text> */}
           <Skeleton width="18rem" height="2rem"/>

          </div>
        </div>


        <div className="space-y-5">
          <Label  className ='text-1xl font-bold tracking-tighter sm:text-xl ' htmlFor="description">Description</Label>
		<Skeleton width="18rem" height="7rem" />
	   
        </div>

        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center sm:justify-end">
          <Button className="w-[140px]" variant="outline">
            Edit
          </Button>
          <Button className="w-[140px]" variant="outline">
            Delete
          </Button>
        </div>



      </div>



    </>
  );
};

export default LoadingIssuesDetailPage;


