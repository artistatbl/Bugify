'use client';

import React, { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectSeparator, SelectGroup } from '@/components/components/ui/select';
import axios from 'axios';
import { toast } from '@/lib/hooks/use-toast';

interface User {
	id: string;
	name: string;
   }
interface AssigneeSelectProps {
	issueId: string;
	organizationSlug: string;
   }
const AssigneeSelect = ({ issueId, organizationSlug }: AssigneeSelectProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
		const response = await axios.get(`/api/users?organizationSlug=${organizationSlug}`);

        setUsers(response.data);
      } catch (error) {
        toast({
          title: 'Error fetching users',
          description: 'Unable to fetch users from the organization.',
          variant: 'destructive',
        });
      }
    };

    fetchUsers();
  }, [organizationSlug]);

  const handleAssigneeChange = async (userId: string) => {
	console.log("Attempting to update assignee with ID:", userId);
	try {
	  const response = await axios.patch(`/api/issues/${issueId}`, { assignedToUserId: userId });
	  console.log("Server response:", response.data);
	  setSelectedUserId(userId || null);
	  toast({
	    title: 'Success',
	    description: 'Assignee has been updated successfully.',
	    variant: 'default',
	  });
	  setTimeout(() => {
		window.location.reload();
	  }, 500);
	} catch (error) {
	  console.error("Error updating assignee:", error);
	  toast({
	    title: 'Error updating assignee',
	    description: 'Could not update the issue assignee.',
	    variant: 'destructive',
	  });
	}
   };
  return (
	<Select onValueChange={handleAssigneeChange}>
	<SelectTrigger aria-label="Select assignee">
	  {selectedUserId ? users.find(user => user.id === selectedUserId)?.name : 'Select assignee'}
	</SelectTrigger>
	<SelectContent>
	  <SelectGroup>
	    <SelectLabel>Assign to:</SelectLabel>
	    {users.map(user => (
		 <SelectItem key={user.id} value={user.id}>
		   {user.name}
		 </SelectItem>
	    ))}
	  </SelectGroup>
	</SelectContent>
 </Select>
  );
};

export default AssigneeSelect;
