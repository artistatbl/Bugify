'use client';

// IssueFormPage.jsx or IssueFormPage.tsx
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { TextField } from '@radix-ui/themes';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { createIssueSchema } from '@/app/validationSchemas'; // Adjust the import path as necessary
import Select from '@/components/issues/Select';
import { z } from 'zod';
import IssuesNavBar from '@/components/layout/issuesbar';




const statusOptions = [
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'CLOSED', label: 'Closed' },
];

const priorityOptions = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

type IssueForm = z.infer<typeof createIssueSchema>;

const IssueFormPage = () => {
	// const router = useRouter();
  
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmutting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
	  try {
		  setSubmutting(true);
		  await axios.post('/api/issues/', data);
		//   router.push('/issues');
		  //router.refresh();

	  } catch (error) {
		  setSubmutting(false);
		  setError('An unexpected error')


	  }
	  
  });

  return (
    <>
    <IssuesNavBar/>
      <form onSubmit={(onSubmit)} className="space-y-4">
       <TextField.Root>
		<TextField.Input {...register('title')} placeholder="Title" />
	  </TextField.Root>


        {errors.title && <p>{errors.title.message}</p>}

	   <Controller	
	            name="description"
			  control={control}
			  render={({ field }) => (
				  <SimpleMDE placeholder='Description' value={field.value} onChange={field.onChange} />
			  )}
	   />
        {errors.description && <p>{errors.description.message}</p>}

        <Select
          name="status"
          label="Status"
          options={statusOptions}
          register={register}
          errorMessage={errors.status?.message}
        />

        <Select
          name="priority"
          label="Priority"
          options={priorityOptions}
          register={register}
          errorMessage={errors.priority?.message}
        />

        <button type="submit" disabled={isSubmitting} className="btn">
          Submit{isSubmitting && "..."}</button>
      </form>
    </>
  );
};

export default IssueFormPage;
