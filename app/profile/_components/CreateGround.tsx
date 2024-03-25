"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Adjust import based on your project structure
import { createGroundSchema } from '@/app/validationSchemas'; // Adjust import path as necessary
import { z } from 'zod';
import { Button } from '@/components/components/ui/button';
import { Label } from '@/components/components/ui/label';
import { Input } from '@/components/components/ui/input';
import { Loader2 } from "lucide-react"

import {  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/components/ui/dialog'; // Adjust import paths as necessary
import { toast } from '@/lib/hooks/use-toast'; // Adjust import path as necessary

type GroundForm = z.infer<typeof createGroundSchema>;

const CreateGround = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(createGroundSchema),
  });

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

     const createGroundMutation = useMutation({
      mutationFn: async (groundData: GroundForm) => {
        const response = await axios.post('/api/ground/', groundData);
        return response.data;
      },
      
      onSuccess: () => {
        //setIsDialogOpen(false); // Close the dialog

        setIsLoading(false);
        toast({
          title: 'Ground created successfully.',
          description: 'Your ground has been created.',
          variant: 'default',   
        });
        reset();
        setTimeout(() => {
          setIsDialogOpen(false);
        }, 700)

        // Add any additional success logic here, e.g., redirecting the user
      },
      onError: (error) => {
        setIsLoading(false); // Ensure loading is set to false on error as well
        if (axios.isAxiosError(error)) {
          // Check for the specific error response from your API
          const serverResponse = error.response?.data?.message;
          if (error.response?.status === 403 && serverResponse.includes("limit of free grounds")) {
            toast({
              title: 'Limit Reached',
              description: serverResponse,
              variant: 'destructive',
            });
          } else {
            // Handle other errors
            toast({
              title: 'Error creating ground.',
              description: serverResponse || 'An unexpected error occurred. Please try again.',
              variant: 'destructive',
            });
          }
        } else {
          // Handle non-Axios errors
          toast({
            title: 'Error',
            description: 'An unexpected error occurred. Please try again.',
            variant: 'destructive',
          });
        }
      }
    });
    
    

  const onSubmit = (data: GroundForm) => {
    createGroundMutation.mutate(data);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
  <Button
    className='bg-black hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded'
    onClick={() => setIsDialogOpen(true)}
  >
    Create a Ground
  </Button>
</DialogTrigger>

        <DialogContent className='max-w-[415px] sm:max-w-[450px] max-h-[50vh] md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl'>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold border-b pl-6 border-stone-950  mb-5">
              Create a Ground
            </DialogTitle>
            <DialogDescription>
              Ground names including capitalization cannot be changed.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="grid gap-4 py-4  ">
              <div className='relative dark:text-black'>
             
              <Label className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>G/</Label>


              <Input id="name" {...register('name')}
              className='pl-9 w-full col-span-5'
              placeholder='Ground Name'
              />
            </div>

            </div>

            <DialogFooter>
              <Button 
              type="submit"
               variant="outline" 
              disabled={isLoading}

              
               className="w-full">


{isLoading ? (
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  ) : null}


                Create Ground
             
            </Button>

            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateGround;
