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
import EditorOutput from '@/components/issues/EditorOutput';





interface Props {
  params: {
    id: string;

  };
}


export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const ViewIssue = async ({ params }: Props) => {

 

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
  }) || null;
  if (!issue) notFound();
  await delay(500);
  console.log(issue);

  return (
    <>



      <Dialog>
        <DialogTrigger asChild>

          <Button variant="outline" className='font-extralight '>View Issue</Button>


        </DialogTrigger>
        <DialogContent className="max-w-[415px] sm:max-w-[650px]  md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-7xl  border-zinc-900 border-b-2">


          <div className="z-10 px-2 sm:px-4 md:px-6 lg:px-8  space-y-5 ">
            <div className=" relative  ">
            <Text className='font-bold tracking-tighter text-2xl  sm:text-md'>{issue.title}</Text>

              <p className='text-gray-500 dark:text-gray-500 font-light '>

                opened {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
              </p>

            </div>


            <div className="grid gap-4 md:grid-cols-1">
           


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

                <Text className='text-gray-700 dark:text-gray-700 font-thin'>
                  {issue?.assignedToUser?.name ? issue?.assignedToUser?.name : 'Unassigned'}
                </Text>

              </div>
            </div>


            <div className="space-y-2">
              <Label className='text-1xl font-bold tracking-tighter sm:text-xl ' htmlFor="description">Descriptionnn</Label>
              <div>
               <EditorOutput content={issue.description || ''}  />
              

    
  
</div>

          
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

