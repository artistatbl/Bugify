'use client';
import React from 'react';
import { Button } from '@/components/components/ui/button';
import { toast } from '@/lib/hooks/use-toast'; // Adjust the import path as necessary

interface ShareGroundProps {
  name: string;
  slug: string;
}

const ShareGround: React.FC<ShareGroundProps> = async ({ name, slug }) => {
  const ShareGround = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
		title: name,
          text: `Check out this issue: ${name}`,
		url: `https://bugify.vercel.app/ground/${slug}`,
        });
        // Success toast
        toast({
		// title: `${name} shared successfully.`,
          description: `"${slug}" has been shared.`,
          variant: 'default',
        });
      } catch (error) {
        // Error toast
        toast({
		title: `Error sharing ${name}.`,
          description: 'An error occurred while sharing the issue.',
          variant: 'destructive',
        });
      }
    } else {
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(`https://bugify.vercel.app/ground/${slug}`);
        // Success toast for clipboard copy
        toast({
		// title: `${name} link copied.`,
          description: `"${slug}" has been copied to your clipboard.`,
          variant: 'default',
        });
      } catch (err) {
        // Error toast for clipboard copy
        toast({
		title: `Failed to copy ${name} link.`,

          description: 'An error occurred while copying the link to your clipboard.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Button variant="outline" className='w-full text-black px-2' onClick={ShareGround}>
      Share
    </Button>
  );
};

export default ShareGround;
