'use client';

import Spinner from '@/components/issues/Spinner';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from '@/lib/hooks/use-toast'; // Adjust import path as necessary

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {
	if (typeof issueId !== 'string' || issueId.trim() === '') {
	  console.error('Invalid issueId:', issueId);
	  setError(true);
	  toast({
	    title: 'Error',
	    description: 'Invalid issue ID provided.',
	    variant: 'destructive',
	  });
	  return;
	}
   
	try {
	  setDeleting(true);
	  toast({
	    title: 'Processing...',
	    description: 'Deleting the issue.',
	    variant: 'default',
	  });
	  await axios.delete(`/api/issues/${encodeURIComponent(issueId)}`);
	  // Delay success actions by 2 seconds
	  setTimeout(() => {
	    router.push('/issuespage');
	    toast({
		 title: 'Success',
		 description: 'Issue deleted successfully.',
		 variant: 'default',
	    });
	  }, 1500); // 2000 milliseconds = 2 seconds
	} catch (error) {
	  console.error('Error deleting issue:', error);
	  setDeleting(false);
	  setError(true);
	  toast({
	    title: 'Error',
	    description: 'Failed to delete the issue. Please try again.',
	    variant: 'destructive',
	  });
	}
   };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteIssue} disabled={isDeleting}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {error && (
        <AlertDialog.Root open={error}>
          <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>
              This issue could not be deleted. Please try again.
            </AlertDialog.Description>
            <Button
              color="gray"
              variant="soft"
              mt="2"
              onClick={() => setError(false)}
            >
              OK
            </Button>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </>
  );
};

export default DeleteIssueButton;