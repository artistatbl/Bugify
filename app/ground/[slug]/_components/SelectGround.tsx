"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/components/ui/popover"


interface Ground {
  id: string;
  name: string;
  creatorId: string;
  isSubscribed: boolean; // Ensure this property is here to handle subscription status
}

export function SelectGround() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [grounds, setGrounds] = React.useState<Ground[]>([])
  const router = useRouter();

  // Fetch all grounds
  React.useEffect(() => {
    const fetchGrounds = async () => {
      const response = await fetch('/api/ground/get');
      if (response.ok) {
        const data = await response.json();
        setGrounds(data);
      } else {
        console.error('Failed to fetch grounds');
      }
    };

    fetchGrounds();
  }, []);

  // Fetch grounds with subscription status
  React.useEffect(() => {
    const fetchSubscribedGrounds = async () => {
      const response = await fetch('/api/ground/subscription');
      if (response.ok) {
        const data = await response.json();
        setGrounds(data); // This will overwrite the grounds with the subscription status
      } else {
        console.error('Failed to fetch subscribed grounds');
      }
    };

    fetchSubscribedGrounds();
  }, []);

  const handleSelectGround = (event: React.MouseEvent<HTMLDivElement>, groundId: string) => {
    event.preventDefault();
    const selectedGround = grounds.find(ground => ground.name === groundId); // Use id for accuracy
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

  React.useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const selectedGroundName = localStorage.getItem('selectedGroundName');
      if (selectedGroundName) {
        // Use the /api/ground/verify endpoint to check subscription status
        const response = await fetch(`/api/ground/verify${encodeURIComponent(selectedGroundName)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.message === 'Not part of the ground') {
            // User has left the organization, remove from localStorage
            localStorage.removeItem('selectedGroundName');
            setValue(""); // Reset the selected ground in the component state as well
          }
          // If the user is part of the ground, no action is needed
        } else {
          console.error('Failed to verify ground subscription status');
        }
      }
    };
  
    const intervalId = setInterval(checkSubscriptionStatus, 60000); // Check every 60 seconds
  
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [grounds]); // Re-run when the grounds array changes

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between dark:text-black text-center"
        >
          {value || "Select Ground"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <div className="flex flex-col w-full border-b dark:bg-gray-250 text-gray-800 dark:text-white px-5 py-5">
        {grounds.map((ground) => (
  <div key={ground.name} onClick={(event) => handleSelectGround(event, ground.name)} className="cursor-pointer py-2 p-3 border-b hover:bg-gray-100 dark:hover:bg-gray-700 ">
    {ground.name.length > 15? `${ground.name.substring(0, 15)}...` : ground.name}
    {ground.isSubscribed && <Check className="inline ml-2 text-green-400 text-xs h-4 w-4" />} {/* Display checkmark if subscribed */}
  </div>
))}
        </div>
      </PopoverContent>
    </Popover>
  )
}