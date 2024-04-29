'use client';
import React, { useEffect, useState, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/components/ui/dialog';
import { Button } from '@radix-ui/themes';

interface EditIssueDialogProps {
  issueId: string;
}

const UpdateIssue: React.FC<EditIssueDialogProps> = ({ issueId }) => {
  const [issue, setIssue] = useState<any>(null);
  const editorInstance = useRef<EditorJS | null>(null);

  // Fetch the issue data
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`/api/issues/${issueId}`);
        setIssue(response.data);
      } catch (error) {
        console.error("Failed to fetch issue", error);
      }
    };

    fetchIssue();
  }, [issueId]);

  // Initialize EditorJS with the fetched issue data
  useEffect(() => {
    if (issue && issue.description) {
      if (!editorInstance.current) {
        editorInstance.current = new EditorJS({
          holder: 'editor',
          data: issue.description, // Ensure this is in the correct format
        });
      } else {
        // If the editor is already initialized and you need to update its content,
        // you might need to destroy and reinitialize it with new data.
        // EditorJS does not directly support updating the data of an initialized instance.
      }
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [issue]); // Depend on issue to re-run this effect when issue changes

  const updateIssue = async () => {
    if (editorInstance.current) {
      const updatedData = await editorInstance.current.save();

      try {
        await axios.put(`/api/issues/${issueId}`, {
          description: updatedData, // Adjust according to your API and data structure
        });
        // onClose(); // Uncomment or implement onClose to close the dialog on success
      } catch (error) {
        console.error("Failed to update issue", error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Issue</DialogTitle>
          <DialogDescription>
            Update the description of the issue.
          </DialogDescription>
        </DialogHeader>
        <div id="editor" />
        <DialogTrigger asChild>
          <Button variant="outline">Cancel</Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button onClick={updateIssue}>Save</Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateIssue;