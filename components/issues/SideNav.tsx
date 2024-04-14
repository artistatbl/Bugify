"use client"
import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/components/ui/button"
import { ModeToggle } from "../components/ui/darkmode";

import { SelectGround } from "@/app/ground/[slug]/_components/SelectGround";
import UserDropdown from "@/components/layout/user-dropdown";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/components/ui/dropdown-menu"
import { Input } from "@/components/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/components/ui/sheet"
import {

  Package,
  Package2,
  Menu,
  CircleUser,
  Search,
 
} from "lucide-react"

import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import   SearchIssue  from "./SearchIssue";
import  useScroll  from "@/lib/hooks/use-scroll";

import classnames from "classnames"
export default function SideNav ({session }: { session: Session | null }) {

  const currentPath = usePathname();

  const isScrolled = useScroll(50);

  

  return (
    <>
    <div
        className={`fixed  pr-10 pl-10 top-0 w-full h-16 flex justify-center  ${isScrolled ? "border-b border-black dark:border-white pl-10   backdrop-blur-2xl" : "bg-white  dark:bg-black  dark:text-white border-b border-black dark:border-white" } z-30 transition-all`}>
       
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Bugify</span>
      </Link>
      <Link
        href="/dashboard"
        className={classnames(
          currentPath === "/dashboard" ? "text-foreground  text-md font-semibold md:text-base" : "text-muted-foreground text-md font-semibold md:text-base", 
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/issuespage"
        className={classnames(
          currentPath === "/issuespage" ? "text-foreground text-md font-semibold md:text-base" : "text-muted-foreground text-md font-semibold md:text-base",
        )}
      >
        Issue
      </Link>
   
      <Link
        href="/profile"
        className={classnames(
          currentPath === "/profile" ? "text-foreground text-md font-semibold md:text-base" : "text-muted-foreground text-md font-semibold md:text-base",
        )}
      >
        Profile
      </Link>

      <SelectGround />
   
    </nav>
 
    <Sheet >
      <div className="flex flex-1 items-center mr-5">
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden dark:bg-black"
          style={{ padding: "8px" }}
          >
          <Menu className="h-5 w-5 " />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      </div>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
            >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Bugify</span>
          </Link>
          <Link href="#" className="hover:text-foreground">
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            >
            Orders
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            >
            Products
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            >
            Customers
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            >
            Analytics
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
 
    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form className="ml-auto flex-1 sm:flex-initial">
        <div className="flex items-center ">

        
          <SearchIssue />
        </div>
      </form>
      <div className=" flex items-center space-x-4  justify-center ">
            {session && (
              <UserDropdown session={session} />
            )}


<div className="mx-4"> {/* This div wraps ModeToggle and applies margin on both sides */}

              <ModeToggle />
            </div>
		  
	

          </div>
      </div>
 
    </div>
    </>
 
  )
}

