'use client'
import React, { useState } from 'react';
import Editor from '@/components/ground/Editor'; // Adjust the import path as necessary
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/components/ui/dialog';
import { Button } from '@radix-ui/themes';

interface CreateIssueProps {
  organizationId: string; // Assuming organizationId is passed as a prop
}

const CreateIssue: React.FC<CreateIssueProps> = ({ organizationId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Create an Issue</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an Issue</DialogTitle>
          <DialogDescription>
            Issue status and priority are automatically set to "Open" and "Low". Update your issue to change them.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* Now using the Editor component and passing the organizationId */}
          <Editor organizationId={organizationId} />
        </DialogFooter>

        <button type='submit' className=' font-bold bg-black hover:bg-gray-300 text-white  py-2 px-4 rounded' form='issueform' > Post


</button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIssue;