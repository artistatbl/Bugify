
"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/components/ui/dialog'
import React, { useState } from 'react'
import { Input } from '@/components/components/ui/input'
import { Label } from '@/components/components/ui/label'
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/components/ui/select'
import { Controller, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import Select from '../../../components/issues/Select';
import { z } from 'zod';
import Link from 'next/link';
import Spinner from '@/components/issues/Spinner';
import { Textarea } from '@/components/components/ui/textarea';
import "easymde/dist/easymde.min.css";
import { createIssueSchema } from '@/app/validationSchemas'; // Adjust the import path as necessary

import dynamic from 'next/dynamic';

import TextareaAutosize from 'react-textarea-autosize';

// import "easymde/dist/easymde.min.css";
// import SimpleMDE from "react-simplemde-editor";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });




const statusOptions = [
	{ value: 'OPEN', label: 'Open' },
	{ value: 'IN_PROGRESS', label: 'In Progress' },
	{ value: 'CLOSED', label: 'Closed' },
	{ value: 'OVERDUE', label: 'Overdue' },
	{ value: 'CANCELLED', label: 'Cancelled' },
	{ value: 'COMPLETED', label: 'Completed' },
	{ value: 'REOPENED', label: 'Reopened' },
	{ value: 'NOT_STARTED', label: 'Not Started' },
];

const priorityOptions = [
	{ value: 'LOW', label: 'Low' },
	{ value: 'MEDIUM', label: 'Medium' },
	{ value: 'HIGH', label: 'High' },
	{ value: 'MORNAL', label: 'Mornal' },
	{ value: 'CRITICAL', label: 'Critical' },
];

type IssueForm = z.infer<typeof createIssueSchema>;


const CreateIssue = () => {






 const [input, setInput] = useState<string>('')

 const router = useRouter();


 const { register, handleSubmit, control, formState: { errors } } = useForm<IssueForm>({
	resolver: zodResolver(createIssueSchema)
   });
 
   const [error, setError] = useState('');
   const [isSubmitting, setSubmitting] = useState(false);
 
   const onSubmit = handleSubmit (async (data)  => {
	try {
	  setSubmitting(true);
	  
	  // Include organizationId in the submission data
	  const submissionData = {
	    ...data,
	   // organizationId: session?.user?.organizationId, 
	   // userId: session?.user?.id,
	    
	    // Add this line
	  };
	  //console.log(session?.user?.organizationId),
 
	  // Use axios to submit the form data, including the organizationId
	  await axios.post('/api/issues/', submissionData);
	  router.push('/issuespage'); // Or your intended success route
	} catch (error) {
	  setError('An unexpected error occurred');
	} finally {
	  setSubmitting(false);
	}
   });
 



   const { ref: titleRef, ...rest } = register('title');


  return (
	<Dialog>
	<DialogTrigger asChild>
	  <Button variant="outline">Create a Issue</Button>
	</DialogTrigger>
	<DialogContent className="max-w-[415px] sm:max-w-[450px]  md:max-w-2xl 2xl:max-w-3xl">
  <DialogHeader>
    <DialogTitle className="text-2xl font-semibold border-b pl-6 border-stone-950 ">Create a Issue</DialogTitle>
    <DialogDescription>
      Issue names including capitalization cannot be changed.
    </DialogDescription>
  

  </DialogHeader>
  <div className='w-full p-4 rounded-lg border border-zinc-300 '>
    <form onSubmit={onSubmit}>
      <div className='prose prose-stone dark:prose-invert'>
        <TextareaAutosize
        ref={(e) => {
          titleRef(e)
          // @ts-ignore

          //_titleRef.current = e
        }}
        {...rest}
        placeholder='title'
        className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-semibold leading-[1.1]  focus:outline-none border-none '
        
        />
        <div id='editor' className='w-full' />
        <p className='text-sm text-gray-400'>
          Use 
          
          {' '}
          <kbd className="rounded-md border px-1 text-xs uppercase"> Tab



          </kbd>{''}
          to open the command menu.




        </p>
        

      




      </div>



      <div>
        <Select
          name="status"
          label="Status"
          options={statusOptions}
          register={register}
          errorMessage={errors.status?.message}
        />
      </div>
      <div>
        <Select
          name="priority"
          label="Priority"
          options={priorityOptions}
          register={register}
          errorMessage={errors.priority?.message}
        />
      </div>

      </form>






  </div>

  
  <DialogFooter>
    <Button variant="outline"  type="submit" className="bg-black hover:bg-gray-300 text-white font-bold py-2 px-4 rounded">Create Ground</Button>
  </DialogFooter>
</DialogContent>

   </Dialog>
 )
}

export default CreateIssue