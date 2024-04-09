"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation";
import prisma from 'prisma/client';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { cn } from "@/lib/utils"
import { Button } from "@/components/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/components/ui/popover"




interface Ground {
	id: string;
	name: string;
	creatorId: string;
   }
   
export function SelectGround() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [grounds, setGrounds] = React.useState<Ground[]>([])
  const router = useRouter();



   
  // State to store the grounds


 // The corrected code should be implemented in an async function or useEffect hook with proper session handling
 
 React.useEffect(() => {
	const fetchGrounds = async () => {
	  const response = await fetch('/api/ground/get', );
	  if (response.ok) {
	    const data = await response.json();
	    setGrounds(data);
	  } else {
	    // Handle error: response.status and response.statusText will have details
	    console.error('Failed to fetch grounds');
	  }
	};
   
	fetchGrounds();
   }, []);


   const handleSelectGround = (event: React.MouseEvent<HTMLDivElement>, groundId: string) => {
	event.preventDefault();
	const selectedGround = grounds.find(ground => ground.id === groundId);
	if (selectedGround) {
	  setValue(selectedGround.name);
	  localStorage.setItem('selectedGroundName', selectedGround.name); // Save to localStorage
	  router.push(`/ground/${groundId}`);
	}
   }

   React.useEffect(() => {
	const selectedGroundName = localStorage.getItem('selectedGroundName') || "";
	setValue(selectedGroundName);
   }, []);



  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between dark:text-black"
        >
		{value || "Select Ground"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
	 <div className="flex flex-col w-full border-b  dark:bg-gray-250 text-gray-800 dark:text-white px-5 py-5">
          {grounds.map((ground) => (
         <div key={ground.id} onClick={(event) => handleSelectGround(event, ground.id)} className="cursor-pointer py-1 p-2 hover:bg-gray-100  dark:hover:bg-gray-700">
	    {ground.name}
	  </div>
          ))}
        </div>
	 </PopoverContent>
    </Popover>
  )
}
