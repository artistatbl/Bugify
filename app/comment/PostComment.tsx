'use client'

import { Comment, User } from '@prisma/client'
import { FC, useState, useRef } from 'react'
import { z, infer as zInfer } from 'zod';
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useOnClickOutside } from 'lib/hooks/use-on-click-outside'
import axios from 'axios'
import { UserAvatar } from '@/components/comment/UserAvatar';
import { Toaster, toast } from 'sonner'

import { Label } from '@/components/components/ui/label'
import { Textarea } from '@/components/components/ui/textarea'
import { Button } from '@/components/components/ui/button'

import { createCommentSchema } from '@/app/validationSchemas';
import { MessageSquare } from 'lucide-react';
import { useSession } from 'next-auth/react'






type CreateCommentFormData = zInfer<typeof createCommentSchema>;






type ExtendedComment = Comment & {
	user: User
	
}

type IssueCommentProps = {
	issueId: string
	comment: ExtendedComment

}

const IssueComment: FC<IssueCommentProps> = ({
	issueId,
	comment
}) => {
     const {data: session} = useSession();
	const [isReplying, setIsReplying] = useState<boolean>(false);
	const commentRef = useRef<HTMLDivElement>(null);
	const [input, setInput] = useState<string>(`@${comment.user.name} `)
	const router = useRouter();
	useOnClickOutside(commentRef, () => {
		setIsReplying(false)
	})

	const { mutate: IssueComment, status } = useMutation({
		mutationFn: async (data: CreateCommentFormData) => {
			const res = await axios.post('/api/comment', data);
			return res.data;
		},
		onSuccess: () => {
			toast.success('Comment created successfully');
			setIsReplying(false);
			router.refresh();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});



	return (

		<div ref={commentRef} className='flex flex-col'>
			<div className='flex items-center'>
				<UserAvatar
				 user={{
					name: comment.user.name || null,
					image: comment.user.image || null,
				 }}
				 className='w-6 h-6'
				
				/>
				<div className='ml-2 flex items-center gap-x-2'>
					<p className='text-sm font-medium'>{comment.user.name}</p>
					{/* <p className='text-xs text-foreground/50'>
						{formatDistanceToNow(new Date(comment[0].createdAt), { addSuffix: true })} */}
				</div>
			</div>
			<p className='text-sm text-zinc-900 dark:text-white mt-2'>{comment.text}</p>

			<div className='flex items-center gap-2'>
				<Button
					variant='ghost'
					size='sm'

					onClick={() => setIsReplying((prev) => !prev)}
				>
					<MessageSquare className='w-4 h-4 mr-1.5' />
					Reply
				</Button>
				</div>
				{isReplying ? (
					<div className='mt-2'>
						<Label htmlFor='comment'>Your comment</Label>
						<div className='mt-2'>
							<Textarea 
							onFocus={(e)=>
								e.currentTarget.setSelectionRange(
									e.currentTarget.value.length,
									e.currentTarget.value.length
								)
							}
							autoFocus
							id='comment'
							value={input}
							onChange={(e) => {
								setInput(e.target.value);
							}}
							rows={3}
							placeholder='what do you think?'
							// placeholder={`@${comment[0].user.name} `}
							/>
							<div className='mt-2 flex justify-end gap-2'>
								<Button
								tabIndex={-1}
								variant='ghost'
								onClick={() => setIsReplying(false)}>
									cancel
								</Button>
							

							<Button 
							//isLoading={isloading}
							onClick={() => {
								if(!input) return;
								IssueComment({
									issueId,
									text: input,
									replyToId: comment.replyToId ?? comment.id,
								})
								
								
							}}>
								Post
							</Button>
							</div>
							</div>
					</div>
					

					
				) : null}


		</div>
	)

}


	export default IssueComment