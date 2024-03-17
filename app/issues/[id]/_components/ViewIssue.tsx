import prisma from 'prisma/client';
import { notFound } from 'next/navigation';
import delay from 'delay';
import { Button, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/components/issues/IssuesStatusBadge';
import ReactMarkdown from 'react-markdown';
import { Label } from '@/components/components/ui/label';
import { formatDistanceToNow } from 'date-fns';
import IssuePriorityBadge from '@/components/issues/IssuesPriorityBadge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/components/ui/dialog';
import Link from 'next/link';
import "easymde/dist/easymde.min.css";
import { MessageSquare } from 'lucide-react';







interface Props {
  params: {
    id: string;

  };
}

const ViewIssue = async ({ params }: Props) => {

 

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
    include: {
      _count: {
        select: {
          comments: true,
        },
      }
    }
  });
  if (!issue) notFound();
  await delay(500);
  console.log(issue);

  return (
    <>



      <Dialog>
        <DialogTrigger asChild>

          <Button variant="outline" className='font-extralight '>View Issue</Button>


        </DialogTrigger>
        <DialogContent className="max-w-[415px] sm:max-w-[450px] md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">


          <div className="z-10 mx-auto max-w-6xl px-10 sm:px-8  md:px-10 lg:px-14 xl space-y-10 ">
            <div className="space-y-2">
              <h1 className='text-1xl font-bold tracking-tighter sm:text-2xl md:text-3xl'>{`Issue #${issue.id}`} </h1>
              <p className='text-gray-500 dark:text-gray-500 font-light'>
                opened {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
              </p>
            </div>


            <div className="grid gap-4 md:grid-cols-1">
              <div className="">
                <Text className='text-md font-bold tracking-tighter sm:text-md'>{issue.title}</Text>
              </div>



              <div className=" space-x-10">
                <Label className='text-1xl font-bold tracking-tighter sm:text-lg' htmlFor="status">Status</Label>



                <IssueStatusBadge status={issue.status} />

              </div>

              <div className='space-x-10 flex items-center'>
                <Label className='text-1xl font-bold tracking-tighter sm:text-lg relative' htmlFor="priority">Priority</Label>
                <IssuePriorityBadge priority={issue.priority}  />

              </div>
              <div className='space-x-5'>
                <Label className='text-1xl font-bold tracking-tighter sm:text-lg font' htmlFor="assignee">Assignee</Label>

                <Text className=' text-gray-700 dark:text-gray-700 font-thin'>{issue.assignedToUserId}</Text>


              </div>
            </div>


            <div className="space-y-2">
              <Label className='text-1xl font-bold tracking-tighter sm:text-xl ' htmlFor="description">Descriptionnn</Label>
              <ReactMarkdown className="border  rounded-lg pl-10 pr-10 pt-5 pb-5  dark:border-gray-500 dark:bg-gray-550  leading-6 text-gray-700 dark:text-gray-700 overflow-hidden break-words md:text-base lg:text-lg xl:text-xl">
                {issue.description}


                
              </ReactMarkdown>
              <h2 className="flex items-center gap-2"> 

              <MessageSquare className="w-5 h-5" />
                
                
                 {issue?._count?.comments || 0}</h2>

              



              <button className='bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-700 hover:text-gray-800 dark:hover:text-gray-300 font-light py-2 px-4 rounded'> <Link href={`/issues/${issue.id}`}>Comment</Link>
              
                
                
                </button>



              
            </div>

          </div>

        </DialogContent>
      </Dialog> 


    </>
  );
};

export default ViewIssue;

