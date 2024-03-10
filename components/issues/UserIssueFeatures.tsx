'use client';

import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/components/ui/popover";
import {Pencil2Icon} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/components/ui/select";
import {Issue} from "../../types";
import axios from "axios";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import IssuePriorityBadge from './IssuesPriorityBadge';
import issuesStatuses from './IssuesStatusBadge';
import {Priority, Status} from "@prisma/client";

const  UserIssueFeatures = ({issue}: { issue: Issue }) => {
  const router = useRouter()
  const priorities = IssuePriorityBadge
  const statuses = issuesStatuses
  const setPriority = async (priority: Priority) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {priority});
      router.refresh();
    } catch (error) {
      toast.error('Changes could not be saved.');
    }
  };

  const setStatus = async (status: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {status});
      router.refresh();
    } catch (error) {
      toast.error('Changes could not be saved.');
    }
  };

  return (
      <div>
        <Popover>
          <PopoverTrigger>
            <Pencil2Icon className="w-5 h-5"/>
          </PopoverTrigger>
          <PopoverContent className="w-60">
            <div className="flex flex-col gap-2">
              <Select
                  defaultValue={issue.priority!}
                  onValueChange={setPriority}>
                <p className="text-sm text-muted-foreground">Set Priority</p>
                <SelectTrigger className="">
                  <SelectValue placeholder="Assign..."/>
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectGroup>
                    <SelectLabel>Priorities</SelectLabel>
                    {priorities?.map(priority => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                    ))}
                  </SelectGroup> */}
                  
                </SelectContent>
              </Select>
              <Select
                  defaultValue={issue.status!}
                  onValueChange={setStatus}>
                <p className="text-sm text-muted-foreground">Set Status</p>
                <SelectTrigger className="">
                  <SelectValue placeholder="Assign..."/>
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectGroup>
                    <SelectLabel>Statuses</SelectLabel>
                    {statuses?.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                    ))}
                  </SelectGroup>  */}
                  
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      </div>
  );
};

export default UserIssueFeatures;