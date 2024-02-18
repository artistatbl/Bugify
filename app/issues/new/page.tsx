'use client';

// IssueFormPage.jsx or IssueFormPage.tsx
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { Button, TextField } from '@radix-ui/themes';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import SimpleMDE from "react-simplemde-editor";
import Select from '@/components/issues/Select';
import { z } from 'zod';
import IssuesNavBar from '@/components/layout/issuesbar';
import { Label } from '@/components/components/ui/label';
import Link from 'next/link';
import Spinner from '@/components/issues/Spinner';
import { Textarea } from '@/components/components/ui/textarea';
import "easymde/dist/easymde.min.css";
import { createIssueSchema } from '@/app/validationSchemas'; // Adjust the import path as necessary






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
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post('/api/issues/', data);
      router.push('/issuespage');
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error');
    }
  });

  return (
    <>
      <IssuesNavBar />
      <form onSubmit={onSubmit} className="space-y-4">
        <div className='min-h-screen py-8 px-4 sm:py-12 sm:px-6 lg:px-8'>
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 '>
            <div className='mb-4'>
              <Label className='text-xl font-medium tracking-tighter sm:text-lg' htmlFor="title">Title</Label>
              <TextField.Input {...register('title')} placeholder="Issues Title" />
              {errors.title && <p className='text-red-500 text-center mt-2'>{errors.title.message}</p>}
            </div>
            <div className='mb-4'>
              <Label className='text-xl font-medium tracking-tighter sm:text-lg' htmlFor="description">Description</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <SimpleMDE placeholder='Describe the issue' value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.description && <p className='text-red-500 text-center mt-2'>{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            </div>
            <div className="mt-6">
              <Button disabled={isSubmitting} className="w-full">Submit New Issue{isSubmitting && <Spinner />}</Button>
            </div>
            <div className='mt-2'>
              <Link className='text-gray-500 block font-light text-sm text-center underline hover:text-gray-900' href="/issuespage">Back to Issues Page</Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default IssueFormPage;