"use client";
import {FC, useState} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Toaster, toast } from 'sonner'

import { Label } from '@radix-ui/react-label';
import { Textarea } from '@/components/components/ui/textarea';
import { Button } from '@/components/components/ui/button';
import { useRouter } from 'next/navigation';
import { createCommentSchema } from '@/app/validationSchemas';
import { z, infer as zInfer } from 'zod';
import { useMutation } from '@tanstack/react-query';

type CreateCommentFormData = zInfer<typeof createCommentSchema>;

interface CreateCommentProps {
  issueId: string;
  replyToId?: string;
}

const CreateComment:FC<CreateCommentProps> = ({ issueId, replyToId  }) => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();

  const { mutate: comment, status } = useMutation({
    mutationFn: async (data: CreateCommentFormData) => {
      const res = await axios.post('/api/comment', data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Comment created successfully');
      setInput('');
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  

 
  return (
	  
    <div className='grid w-full gap-1.5'>
    <Label htmlFor='comment'>Your comment</Label>
    <div className='mt-2'>
    <Toaster richColors  />

      <Textarea
        id='comment'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={1}
        placeholder='What are your thoughts?'
      />

      <div className='mt-2 flex justify-end'>
      <Button
  disabled={input.length === 0}
  onClick={() => comment({ issueId, text: input, replyToId })}
  //status={status}
  >
  Post
</Button>
      </div>
    </div>
  </div>
)
}

export default CreateComment;
