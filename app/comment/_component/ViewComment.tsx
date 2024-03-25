import { getServerSession } from 'next-auth';
import authOptions from "@/app/auth/authOptions";
import prisma from '../../../prisma/client'
import CreateComment from './CreateComment';
import { Comment, User } from '@prisma/client';
import PostComment from '@/app/comment/PostComment';


type ExtendedComment = Comment  & {
	user: User
	replies: ReplyComment[]
 	
}

type ReplyComment = Comment & {
	user: User
	replyToId: string
}





interface CommentsSectionProps {
   issueId: string
   comments: ExtendedComment[]
}

const ViewComment = async ({issueId}: CommentsSectionProps) => {
	const session = await getServerSession(authOptions); // Retrieve the session data

	const comments = await prisma.comment.findMany({
		where: {
			issueId,
			replyToId: null,
		},
		include: {
			user: true,
			replies: {
				include: {
					user: true

				},
			},
		},
	})

	return (
		<div className='flex flex-col gap-y-4 mt-4'>
		<hr className='w-full h-px my-6 ' />
    
		<CreateComment issueId={issueId} />
    
		<div className='flex flex-col gap-y-6 mt-4  dark:bg-zinc-800 dark:text-white p-10'>
		  {comments
		    .filter((comment) => !comment.replyToId)
		    .map((topLevelComment) => {
			
			
			 return (
			   <div key={topLevelComment.id} className='flex flex-col dark:text-white'>
				<div className='mb-2 py-2 pl-2 bg-slate-200 dark:bg-zinc-700'>
				  <PostComment
				    comment={topLevelComment}
				   
				    issueId={issueId}
				  />
				</div>
    
				
				{topLevelComment.replies
				  .filter((reply) => reply.replyToId === topLevelComment.id)
				  .map((reply) => (
					 <div
					   key={reply.id}
					   className='ml-4 py-2 pl-4 border-l-2 border-zinc-400  dark:border-white dark:bg-zinc-700 gap-x-12 '>
						   


						<div className=' bg-zinc-200 dark:bg-zinc-700 py-2 pl-4 '>
					   <PostComment
					     comment={reply}

						issueId={issueId}
					
					   />
						</div>
					 </div>
				    ))}
			   </div>
			 )
		    })}
		</div>
	   </div>
	 )
    }

export default ViewComment;