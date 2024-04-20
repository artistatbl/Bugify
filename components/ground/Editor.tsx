"use client"
import React, { useCallback, useState, useRef, useEffect } from 'react'

import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Session } from 'next-auth';
import { useMutation } from '@tanstack/react-query';

import Select from '../../components/issues/Select';
import { z } from 'zod';
import Link from 'next/link';
import Spinner from '@/components/issues/Spinner';
import { CreateIssueSchema, createIssueSchema } from '@/app/validationSchemas'; // Adjust the import path as necessary
import '../../app/editor.css';
import { useRouter } from 'next/navigation'

import TextareaAutosize from 'react-textarea-autosize';

import type EditorJS from '@editorjs/editorjs';
import { UploadButton } from '@/lib/uploadting';
import { toast } from '../../lib/hooks/use-toast';



type IssueForm = z.infer<typeof createIssueSchema>;

interface EditorProps {
     organizationId: string;
	// handlePostSuccess: () => void;


	
 

}


// const handlePostSuccess = () => {
// 	// Placeholder function or actual logic
//    };
  const Editor: React.FC<EditorProps> = ({organizationId}) => {

	const {
		register,
		handleSubmit,
		formState: { errors }, reset} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
		defaultValues: {
		     organizationId,
			description: '',
			title: '',
			status: 'OPEN',
			priority: 'LOW',
		
			
		}
	})
	

  const ref = useRef<EditorJS>()
  const _titleRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
 
   
   const { mutate: createPost } = useMutation({
    mutationFn: async ({
      
	 title,
	 description,
	 userId,
	 organizationId

    }: CreateIssueSchema & {onSuccessTitle: string}) => {
     //  const payload: CreateIssueSchema = { title, description, userId }
	const payload: CreateIssueSchema = { title, description, userId,  status: 'OPEN', priority: 'LOW'  , organizationId}
      const { data } = await axios.post('/api/ground/create', payload)
      return { data , onSuccessTitle: title }
    },
    onError: () => {
	return toast({
		title: 'Something went wrong.',
		description: 'Your post was not published. Please try again.',
		variant: 'destructive',
	   })
    },

    onSuccess: (data) => {
	  toast({
		// title: 'Post published.',
		// description: 'Your post has been published.',
		description: `Your post "${data.onSuccessTitle}" has been published.`,

		variant: 'default',
	   });
	   reset();
	   router.refresh();
	   //handlePostSuccess();
    },
 
  });

	


   const initializeEditor = useCallback(async () => {
	const EditorJS = (await import('@editorjs/editorjs')).default
	const Header = (await import('@editorjs/header')).default
	const Embed = (await import('@editorjs/embed')).default
	const Table = (await import('@editorjs/table')).default
	const List = (await import('@editorjs/list')).default
	const Code = (await import('@editorjs/code')).default
	const LinkTool = (await import('@editorjs/link')).default
	const InlineCode = (await import('@editorjs/inline-code')).default
	const ImageTool = (await import('@editorjs/image')).default
 
	if (!ref.current) {
	  const editor = new EditorJS({
	    holder: 'editor',
	    onReady() {
		 ref.current = editor
	    },
	    placeholder: 'Type here to write your post...',
	    inlineToolbar: true,
	    data: { blocks: [] },
	    tools: {
		 header: Header,
		 linkTool: {
		   class: LinkTool,
		   config: {
			endpoint: '/api/link',
		   },
		 },
		 image: {
		   class: ImageTool,
		   config: {
			uploader: {
			  async uploadByFile( file: File ) {

				//const res = await UploadButton({ file })

			    
			 

			   return {
				success: 0,
				files: {
				//  url: res.url,
				}
			   }
 
			  },
			  
			},
		   },
		 },
		 list: List,
		 code: Code,
		 inlineCode: InlineCode,
		 table: Table,
		 embed: Embed,
	    },
	  })
	}
   }, [])
 
   useEffect(() => {
	if (Object.keys(errors).length) {
	  for (const [_key, value] of Object.entries(errors)) {
	    value
	    toast({
		title: 'Something went wrong.',
		description: (value as { message: string }).message,
		variant: 'destructive',
	   })
	  }
	}
   }, [errors])
 
   useEffect(() => {
	if (typeof window !== 'undefined') {
	  setIsMounted(true)
	}
   }, [])
 
   useEffect(() => {
	const init = async () => {
	  await initializeEditor();
   
	  setTimeout(() => {
	    _titleRef?.current?.focus();
	  }, 0);
	};
   
	if (isMounted) {
	  init();
   
	  return () => {
	    if (ref.current) {
		 ref.current.destroy();
		 ref.current = undefined;
	    }
	  };
	}
   }, [isMounted, initializeEditor]);

   async function onSubmit(data: IssueForm) {
	const blocks = await ref.current?.save()
 

	const payload: CreateIssueSchema & { onSuccessTitle: string, organizationId: string } = {
		title: data.title,
		description: blocks,
		status: data.status,
		priority: data.priority,
		onSuccessTitle: data.title, 
		organizationId,
		//


	
	}
 
	createPost(payload)
   }
 
   if (!isMounted) {
	return null
   }
 
   const { ref: titleRef, ...rest } = register('title')




	
  return (
	<div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200'>
	<form
	  id='issueform'
	  className='w-fit'
	  onSubmit={handleSubmit(onSubmit)}>

	  <div className='prose prose-stone dark:prose-invert'>
	    <TextareaAutosize
		 ref={(e) => {
		   titleRef(e)
		   // @ts-ignore
		   _titleRef.current = e
		 }}
		 {...rest}
		 placeholder='Title'
		 className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
	    />
	

	    <div id='editor' className='min-h-[500px]' />
	    <p className='text-sm text-gray-500'>
		 Use{' '}
		 <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
		   Tab
		 </kbd>{' '}
		 to open the command menu.
	    </p>
	  </div>
	</form>
   </div>
 )
}

export default Editor