
import prisma from 'prisma/client';
import { notFound } from 'next/navigation';
import delay from 'delay';
import {  Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/components/issues/IssuesStatusBadge';
import ReactMarkdown from 'react-markdown';
import { Label } from '@/components/components/ui/label';
import {formatDistanceToNow} from 'date-fns'
import { Button } from '@/components/components/ui/button';
import IssuePriorityBadge from '@/components/issues/IssuesPriorityBadge';
import { getServerSession } from 'next-auth';
import  authOptions  from "@/app/auth/authOptions";





interface Props {
  params: {
    id: string;
   
  };
}

const IssueDetailPage = async ({ params }: Props) => {
 
//  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) as  number},
  });
  if (!issue) notFound();
  await delay(500);
  console.log(issue);

  return (
    <>
     {/* <SideNav session={session}  /> */}


      <div className="z-10 mx-auto max-w-6xl px-10 sm:px-8  md:px-10 lg:px-14 xl space-y-10 ">
        <div className="space-y-2">
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>{`Issue #${issue.id}`} </h1>
          <p className='text-gray-500 dark:text-gray-500 font-light'>
  opened {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
</p>
        </div>


        <div className="grid gap-4 md:grid-cols-1">
          <div className="">
            <Text className='text-3xl font-bold tracking-tighter sm:text-3xl'>{issue.title}</Text>
          </div>



          <div className=" space-x-10">
            <Label className='text-1xl font-bold tracking-tighter sm:text-lg' htmlFor="status">Status</Label>



            <IssueStatusBadge status={issue.status} />

          </div>

          <div className='space-x-10'>
            <Label className='text-1xl font-bold tracking-tighter sm:text-lg' htmlFor="priority">Priority</Label>
            <IssuePriorityBadge priority={issue.priority} />

          </div>
          <div className='space-x-5'>
            <Label className='text-1xl font-bold tracking-tighter sm:text-lg font' htmlFor="assignee">Assignee</Label>

            {/* <p> {issue.assignedToUserId}</p> */}
           <Text className=' text-gray-700 dark:text-gray-700 font-thin'>{issue.assignedToUserId}</Text>
           

          </div>
        </div>


        <div className="space-y-2">
          <Label  className ='text-1xl font-bold tracking-tighter sm:text-xl ' htmlFor="description">Description</Label>
          <ReactMarkdown className="border  rounded-lg pl-10 pr-10 pt-5 pb-5  dark:border-gray-500 dark:bg-gray-550  leading-6 text-gray-700 dark:text-gray-700 overflow-hidden break-words md:text-base lg:text-lg xl:text-xl">
            {issue.description}
          </ReactMarkdown>
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

export default IssueDetailPage;



