'use client';
import React from 'react';
import { Button } from '@/components/components/ui/button';
import { toast } from '@/lib/hooks/use-toast'; // Adjust the import path as necessary

interface ShareIssueProps {
  title: string;
  url: string;
}

const ShareIssue: React.FC<ShareIssueProps> = ({ title, url }) => {
  const shareIssue = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this issue: ${title}`,
          url,
        });
        // Success toast
        toast({
          title: 'Issue shared successfully.',
          description: 'The issue link has been shared.',
          variant: 'default',
        });
      } catch (error) {
        // Error toast
        toast({
          title: 'Error sharing the issue.',
          description: 'An error occurred while sharing the issue.',
          variant: 'destructive',
        });
      }
    } else {
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(url);
        // Success toast for clipboard copy
        toast({
          title: 'Issue link copied.',
          description: 'The issue link has been copied to your clipboard.',
          variant: 'default',
        });
      } catch (err) {
        // Error toast for clipboard copy
        toast({
          title: 'Failed to copy link.',
          description: 'An error occurred while copying the link to your clipboard.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Button variant="outline" className='dark:text ' onClick={shareIssue}>
      Share
    </Button>
  );
};

export default ShareIssue;
