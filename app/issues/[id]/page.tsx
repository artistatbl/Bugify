
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
import CreateComment from '../../comment/_component/CreateComment';
import ViewComment from '@/app/comment/_component/ViewComment';
import EditorOutput from '@/components/issues/EditorOutput';
import { getServerSession } from 'next-auth';
import  authOptions  from "@/app/auth/authOptions";
import ShareIssue from './_components/ShareIssue';
import SideNav from '@/components/issues/SideNav';





interface Props {
  params: {
    id: string;
   
  };
}

const IssueDetailPage = async ({ params }: Props) => {
 
 const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
      assignedToUser: true,
    }
  });
  if (!issue) notFound();
  await delay(500);
  console.log(issue);

  // Share functionality




  return (
    <>
     <SideNav session={session}  />


      <div className="z-10 flex flex-col w-full min-h-screen max-w-6xl px-10 sm:px-8  md:px-10 lg:px-14 xl space-y-10  bg-white/100 dark:bg-zinc-800 p-10  rounded-2xl ">
   


        <div className="grid gap-4 md:grid-cols-1">
          <div className="">
            <Text className='font-bold tracking-tighter xl:text-6xl lg:text-5xl md:text-4xl xs:text-3xl sm:text-3xl '>{issue.title}</Text>
            <p className='text-gray-500 dark:text-gray-500 font-light'>
  opened {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
</p>
          </div>



          <div className=" space-x-10">
            <Label className='font-bold tracking-tighter xl:text-2xl lg:text-1xl md:text-1xl xs:text-1xl sm:text-xl' htmlFor="status">Status</Label>



            <IssueStatusBadge status={issue.status} />

          </div>

          <div className='space-x-10  flex items-center'>
            <Label className='font-bold tracking-tighter xl:text-2xl lg:text-1xl md:text-1xl xs:text-1xl sm:text-xl' htmlFor="priority">Priority</Label>
            <IssuePriorityBadge priority={issue.priority} />

          </div>
          <div className='space-x-5'>
            <Label className='font-bold tracking-tighter xl:text-2xl lg:text-1xl md:text-1xl xs:text-1xl sm:text-xl' htmlFor="assignee">Assignee</Label>

            {/* <p> {issue.assignedToUserId}</p> */}
           <Text className=' text-gray-700 dark:text-gray-700 font-thin'>{issue.assignedToUser?.name}</Text>
           

          </div>
        </div>


        <div className="space-y-2">
          <Label  className ='font-bold tracking-tighter xl:text-2xl lg:text-1xl md:text-1xl xs:text-1xl sm:text-xl' htmlFor="description">Description</Label>
         

          <div className="space-y-2 bg-zinc-100 dark:bg-zinc-800 p-10 pl-6 border border-black dark:border-white rounded-xl ">
               <EditorOutput content={issue.description ? issue.description || ''  : 'No description'}  />
              

    
  
</div>

        </div>

        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center sm:justify-end">
          <Button className="w-[140px] dark:text-black" variant="outline">
            Edit
          </Button>
          <ShareIssue title={issue.title} url={`http://localhost:3000/issues/${issue.id}`} />

          
         

          <Button className="w-[140px] dark:text-black" variant="outline">
            Delete
          </Button>
        </div>
     {/* @ts-expect-error Async Server Component */}
     <ViewComment issueId={issue?.id ?? issue.id} />




    



      </div>



    </>
  );
};

export default IssueDetailPage;


