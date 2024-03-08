import React from 'react';
import {Issue} from '@/../../types';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/components/ui/avatar';

import Link from "next/link";
//import Priorities from "@/app/components/PrioritySignals";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/components/ui/popover";
import {EnvelopeClosedIcon} from "@radix-ui/react-icons";
import {Badge} from "@/components/components/ui/badge";
//import UserProjectFeatures from "@/app/components/UserProjectFeatures";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = async ({issue}) => {
  const session = await getServerSession(authOptions)
  const sessionUser = session?.user || null;

  const isAssignedToCurrentUser = issue!.assignedToUserId === sessionUser?.id;

  return (
      <div>
        <Card key={issue.id} className="hover:ring-[0.5px] ring-foreground duration-500  transition-all">
          <CardHeader className="relative">
            <CardTitle className="mr-12 text-md -mb-1 truncate">
              <Link href={`/projects/${issue.id}`} className="focus:underline hover:underline">
                {issue.name}
              </Link>
            </CardTitle>
            <CardDescription className="mr-10 truncate">{issue.description}</CardDescription>
            {issue.assignedToUser ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="absolute border right-5 top-5">
                      <AvatarImage src={issue.assignedToUser?.image!}/>
                      <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto">
                    <div className="flex flex-col space-y-4 items-center justify-center">
                      <div className="flex justify-center flex-col space-y-2">
                        <h4 className="text-sm font-semibold">{issue.assignedToUser?.name}</h4>
                        <Badge className="text-[10px] w-20 justify-center">
                          {issue.assignedToUser?.role}
                        </Badge>
                        <div className="flex items-center ">
                          <EnvelopeClosedIcon className="mr-2 h-4 w-4 opacity-70"/>{" "}
                          <span className="text-xs text-muted-foreground">
                            {issue.assignedToUser?.email}
                            </span>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
            ) : 
		//   (
          //       <div className="absolute right-6 top-6">
          //         {isAssignedToCurrentUser && <IssueDetail issue={issue}/>}
          //       </div>
          //   )

		<div>
			
		</div>
		  
		  }
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="overflow-hidden w-[85%]">
                {/* <FrameworkList frameworks={project.frameworks}/> */}
              </div>
              {/* <Priorities priority={project.priority}/> */}
            </div>
          </CardContent>
          <CardFooter className="gap-1 justify-between">
            {/* <Statues className="text-xs" status={project.status}/> */}
            {/* <DueDate dueDate={project.dueDate}/> */}
          </CardFooter>
        </Card>
      </div>
  );
};

export default IssueCard;