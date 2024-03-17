"use client"
import { Button } from '@/components/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/components/ui/dialog'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/components/ui/input'
import { Label } from '@/components/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createGroundSchema } from '@/app/validationSchemas';
import axios from 'axios';
import { Toaster, toast } from 'sonner'

import { z } from 'zod';
import Link from 'next/link';
// import { Spinner } from '../../../components/issues/Spinner';
import { useRouter } from 'next/navigation'
// import { toast } from '@/lib/hooks/use-toast'



type IssueForm = z.infer<typeof createGroundSchema>;

const CreateGround = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: {  errors }  } = useForm<IssueForm>({
    resolver: zodResolver(createGroundSchema)
  });

  // const [delayedNameError, setDelayedNameError] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  // useEffect(() => {
  //   let timer;
  //   if (errors.name) {
  //     // Set a timer to display the error after 3 seconds
  //     timer = setTimeout(() => {
  //       setDelayedNameError(errors.name.message);
  //     }, 3000);
  //   } else {
  //     // If there's no error, clear the delayed error message
  //     setDelayedNameError('');
  //   }

  //   // Cleanup function to clear the timer if the component unmounts
  //   // or if the error changes before the timer completes
  //   return () => clearTimeout(timer);
  // }, [errors.name]); // Depend on errors.name to re-run when it changes


 


 
 

  const onSubmit = async (data: IssueForm) => {
    if (!data) {
      console.error("Null pointer exception: data is null");
      return;
    }

    try {
      setSubmitting(true);
      await axios.post('/api/ground/', data).catch(error => {
        console.error(error);
        setError('An unexpected error occurred. Please try again.');
      });

      toast.success('Ground created successfully!');
      router.refresh(); // Optional: Reset form state
      // router.push('/profile'); If you want to navigate after closing the modal, do it here
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <>
    <Dialog> 
      <DialogTrigger asChild>
      <Button  className='bg-black dark:bg-white hover:bg-zinc-500 dark:text-black dark:hover:bg-zinc-900 dark:hover:text-white text-white font-bold py-2 px-4 rounded'>
    Create a Ground
  </Button>
      
      
      </DialogTrigger>
      <Toaster richColors/>
    

      <DialogContent className="max-w-[415px] sm:max-w-[450px] md:max-w-2xl 2xl:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold border-b pl-6 border-stone-950 mb-5">
            Create a Ground
          </DialogTitle>
          <DialogDescription>

            Ground names including capitalization cannot be changed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>


          <div className="grid gap-4 py-4">
            <div className='relative dark:text-black '>
              <Label className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>G/</Label>

              <Input
                {...register('name')} // Use the 'register' function for integrating the input with react-hook-form
                className='pl-9 col-span-5'
                placeholder="Enter ground name"
              />
            </div>
        

          
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          </div>
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Creating...' : 'Create Ground'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
}

export default CreateGround;

