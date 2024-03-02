"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LayoutDashboard, LogOut } from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { Session } from "next-auth";
import { useRouter } from 'next/navigation'; // Import useRouter from next/router
import { useToast } from "@/lib/hooks/use-toast";

export default function UserDropdown({ session }: { session: Session }) {
  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);
  const router = useRouter(); // Initialize the router
  const {toast} = useToast()

  // Function to handle logout and redirect
  const handleLogout = async () => {
    await signOut({
      redirect: false, // Prevent NextAuth from performing the redirect automatically
    });

    toast({
      title: 'Logged out',
      description: 'You have successfully logged out.',
      duration: 2000,
    });
    router.push('/'); // Manually redirect to the dashboard page
  };

  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white  dark:bg-black p-2 sm:w-56">
            <div className="p-2">
              {session?.user?.name && (
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {session?.user?.name}
                </p>
              )}
              <p className="truncate text-sm text-gray-500 dark:text-gray-300">
                {session?.user?.email}
              </p>
            </div>
            <button
              className="relative flex w-full cursor-not-allowed items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
         
              <a
                href="/dashboard"
                className="inline-flex w-full cursor-pointer items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 dark:hover:bg-gray-600"
                role="button" // Add role="button" for accessibility
              >
       
                <LayoutDashboard className="h-4 w-4" />
                <span className="text-sm">Dashboard</span> {/* Use <span> instead of <p> for inline elements */}
              </a>
            </button>


            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>


          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}
