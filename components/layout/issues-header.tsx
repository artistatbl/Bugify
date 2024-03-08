'use client';
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import UserDropdown from "./user-dropdown";


import { Session } from "next-auth";
import { Button } from "@radix-ui/themes";
import { ModeToggle } from "../components/ui/darkmode";

export default function Header({ session }: { session: Session | null }) {

  const isScrolled = useScroll(50);

  return (
    <>
      <div
        className={`fixed rounded-full pr-10 pl-10 top-0 w-full h-16 flex justify-center ${isScrolled ? "border-b border-black dark:border-white pl-10 rounded-full  backdrop-blur-2xl" : "bg-white  dark:bg-black  dark:text-white border-b border-black dark:border-white" } z-30 transition-all`}>
        <div className="flex w-full h-16 max-w-screen-xl justify-between items-center px-5 ">
          {/* Left part of the Navbar: Logo and Links */}
          <div className="flex items-center space-x-5">
            <Link legacyBehavior href="/" passHref>
              <a>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width="30"
                  height="30"
                  className="rounded-sm"
                />
              </a>
            </Link>
            <Link legacyBehavior href="/dashboard" passHref>
              <a className="text-lg font-medium dark:text-white hidden md:block">
                <p>Dashboard</p>
              </a>
            </Link>
            <Link legacyBehavior href="/issuespage" passHref>
              <a className="text-lg font-medium dark:text-white hidden md:block">
                <p>Issues</p>
              </a>
            </Link>
            <Link legacyBehavior href="/profile" passHref>
              <a className="text-lg font-medium dark:text-white hidden md:block">
                <p>Profile</p>
              </a>
            </Link>
          </div>
          
          {/* Right part of the Navbar: Session/User Dropdown */}
          <div className=" flex items-center space-x-4  justify-center ">
            {session && (
              <UserDropdown session={session} />
            )}
		  
		 <ModeToggle />

          </div>
		
        </div>
      </div>
    </>
  );
}