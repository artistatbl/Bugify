import { Priority } from '@prisma/client';
import { Badge } from '@radix-ui/themes'
import React, {ReactNode} from 'react';

import { SignalHighIcon, SignalIcon, SignalLowIcon, SignalMediumIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/components/ui/popover';
interface ProjectPriority {
  value: Priority;
  label: string;
  icon?: ReactNode;
  className: string;
}


export const projectPriorities: ProjectPriority[] = [
  {
    value: 'LOW',
    label: 'Low Priority',
    icon: <SignalLowIcon className="text-blue-600 dark:text-blue-500" strokeWidth={2}/>,
    className: "text-blue-600 dark:text-blue-500"
  },
  {
    value: 'MEDIUM',
    label: 'Medium Priority',
    icon: <SignalMediumIcon className="text-green-600 dark:text-green-500" strokeWidth={2}/>,
    className: "text-green-600 dark:text-green-500"
  },
  {
    value: 'HIGH',
    label: 'High Priority',
    icon: <SignalHighIcon className="text-yellow-500 dark:text-yeallow-500" strokeWidth={2}/>,
    className: "text-amber-600 dark:text-amber-500"
  },
  {
    value: 'MORNAL',
    label: 'Mornal Priority',
    icon: <SignalIcon className="text-orange-500 dark:text-orange-500" strokeWidth={2}/>,
    className: "text-red-600 dark:text-red-500"
  },


  {
    value: 'CRITICAL',
    label: 'Critical Priority',
    icon: <SignalIcon className="text-red-500 dark:text-red-600" strokeWidth={2}/>,
    className: "text-red-600 dark:text-red-500"
  },

];

interface PriorityProps {
  priority: Priority;
  className?: string;
}

const Priorities: React.FC<PriorityProps> = ({className, priority}) => {
  const currentPriority = projectPriorities.find((projectPriority) => projectPriority.value === priority);

  if (!currentPriority) {
    return <p className="text-red-500">Invalid priority</p>;
  }

  return (
      <Popover>
        <PopoverTrigger
            className={` ${className} ${currentPriority.className} flex gap-1 border-none items-center font-medium`}>
          {currentPriority.icon}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 text-xs">
          <div>{currentPriority.label}</div>
        </PopoverContent>
      </Popover>
  );
};
export const PrioritiesText: React.FC<PriorityProps> = ({priority}) => {
  const currentPriority = projectPriorities.find((projectPriority) => projectPriority.value === priority);

  if (!currentPriority) {
    return <p className="text-red-500">Invalid priority</p>;
  }

  return (
      <div className={`${currentPriority.className}`}>{currentPriority.label}</div>
  );
};

export default Priorities;