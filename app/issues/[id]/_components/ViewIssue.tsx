
import prisma from 'prisma/client';
import { notFound } from 'next/navigation';
import delay from 'delay';
import { Button, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/components/issues/IssuesStatusBadge';
import ReactMarkdown from 'react-markdown';
import { Label } from '@/components/components/ui/label';
import { formatDistanceToNow } from 'date-fns';
import IssuePriorityBadge from '@/components/issues/IssuesPriorityBadge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/components/ui/dialog';
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
        <DialogTrigger asChild >

          <Button variant="outline" className='font-extralight '>View Issue</Button>


        </DialogTrigger>

        <DialogContent className="max-w-[450px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px] 3xl:max-w-[1400px] border-zinc-900 border-b-2 dark:border-white dark:bg-white/100 dark:text-black">
         <DialogHeader>
          <DialogTitle className="text-3xl font-semibold border-b pl-6 border-stone-950 dark:text-black ">View Issue</DialogTitle>
          <DialogDescription className=''>
            Click on the issue title to view the issue.

            </DialogDescription>

            </DialogHeader>


          <div className="z-10 px-2 sm:px-4 md:px-6 lg:px-8 space-y-5 ">
            <div className=" relative  ">
            {/* <Text className='font-bold tracking-tighter text-3xl  sm:text-4xl'>{issue.title}</Text> */}


            <Link href={`/issues/${issue.id}`}>
              <Text className='dark:text-black'>{issue.title}</Text>
            </Link>

              <p className='text-gray-500 dark:text-gray-500 font-light '>

                opened {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
              </p>

            </div>


            <div className="grid gap-4 md:grid-cols-1">
           


              <div className=" space-x-10">
              <Label className='text-xl  md:text-xl lg:text-2xl font-bold tracking-tighter sm:text-xl dark:text-black' htmlFor="description">Status</Label>




                <IssueStatusBadge status={issue.status} />

              </div>

              <div className='space-x-10 flex items-center'>
                
                <Label className='text-xl  md:text-xl lg:text-2xl font-bold tracking-tighter sm:text-xl dark:text-black' htmlFor="description">Priority</Label>

                
                <IssuePriorityBadge priority={issue.priority}  />

              </div>
              <div className='space-x-5'>
                <Label className='text-xl  md:text-xl lg:text-2xl font-bold tracking-tighter sm:text-xl dark:text-black' htmlFor="description">Assignee</Label>


                <Text className='text-gray-700 dark:text-gray-700 font-thin'>
                  {issue?.assignedToUser?.name ? issue?.assignedToUser?.name : 'Unassigned'}
                </Text>

              </div>
            </div>


            <div className="space-y-2 ">
            <Label className='text-xl  md:text-xl lg:text-2xl font-bold tracking-tighter sm:text-xl' htmlFor="description">Description</Label>


<div className='relative bg-zinc-100 dark:bg-zinc-800 p-10 pl-6 border border-black  dark:text-white rounded-xl max-w-[350px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px] 2xl:max-w-[1300px] 3xl:max-w-[1300px]'>

              <EditorOutput content={issue.description} />
              {typeof issue.description === 'string' && issue.description.length > 160 && (
                <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black to-transparent dark:from-white dark:to-transparent'></div>
                )}


                
                </div>


          
              <h2 className="flex items-center gap-2 dark:text-black"> 

              <MessageSquare className="w-5 h-5" />
                
                
                 {issue?._count?.comments || 0}</h2>

              



              <button className='bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white hover:text-gray-800 dark:hover:text-gray-900 font-light py-2 px-4 rounded '> <Link href={`/issues/${issue.id}`}>Comment</Link>
              
                
                
                </button>



              
            </div>

          </div>

        </DialogContent>
      </Dialog> 


    </>
  );
};

export default ViewIssue;

