import React, {ReactNode} from 'react';
import {Status} from "@prisma/client";
import {
  CheckCircledIcon,
  CircleBackslashIcon,
  CrumpledPaperIcon,
  FileMinusIcon,
  LinkBreak2Icon,
  ReloadIcon,
  ResumeIcon,
  SymbolIcon
} from "@radix-ui/react-icons";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/components/ui/popover";

interface IssueStatus {
  value: Status;
  label: string;
  description: string;
  icon?: ReactNode;
  className: string;
}


export const issuesStatuses: IssueStatus[] = [
  {
    value: 'NOT_STARTED',
    label: 'Not Started',
    description: 'The task or project has been created but has not yet begun.',
    icon: <ResumeIcon className="animate-pulse"/>,
    className: "text-slate-600 dark:text-slate-400"
  },
  {
    value: 'IN_PROGRESS',
    label: 'In Progress',
    description: 'Work on the task or project has started and is currently ongoing.',
    icon: <SymbolIcon className="animate-spin" />,
    className: "text-lime-600 dark:text-lime-500"
  },
  {
    value: 'CLOSED',
    label: 'Closed',
    description: 'The task or project has been completed and closed.',
    icon: <LinkBreak2Icon />,
    className: "text-sky-600 dark:text-sky-500"
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
    description: 'The task or project has been finished successfully.',
    icon: <CheckCircledIcon />,
    className: "text-green-600 dark:text-green-400"
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled',
    description: 'The task or project has been abandoned or terminated before completion.',
    icon: <FileMinusIcon />,
    className: "text-rose-700 dark:text-rose-500"
  },
  {
    value: 'OPEN',
    label: 'Open',
    description: 'The task or project is currently open for work.',
    icon: <CircleBackslashIcon />,
    className: "text-yellow-600 dark:text-yellow-500"
  },
  {
    value: 'OVERDUE',
    label: 'Overdue',
    description: 'The task or project has passed its due date without completion.',
    icon: <CrumpledPaperIcon />,
    className: "text-red-600 dark:text-red-700"
  },
  {
    value: 'REOPENED',
    label: 'Reopened',
    description: 'A previously completed task or project has been reopened for additional work or revisions.',
    icon: <ReloadIcon className="animate-spin" />,
    className: "text-purple-600 dark:text-purple-400"
  },
];

interface StatuesProps {
  status: Status; // Assuming that the 'status' prop is of type Status
  className?: string;
}
const Statues: React.FC<StatuesProps> = ({ status, className }) => {
  // Find the corresponding project status based on the 'status' prop
  const issueStatus = issuesStatuses.find((issueStatus) => issueStatus.value === status);

  if (!issueStatus) {
    return <p className="text-red-500">Invalid status</p>;
  }

  return (
	<Popover>
	<PopoverTrigger className={`inline-flex items-center gap-2 ${className} ${issueStatus.className}`}>
	  {issueStatus.icon}
	  {issueStatus.label}
	</PopoverTrigger>
	<PopoverContent className="w-auto p-4">
	  <div className="text-sm">
	    {issueStatus.description}
	  </div>
	</PopoverContent>
   </Popover>
  );
};

export default Statues;


