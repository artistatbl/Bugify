'use client';
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import UserDropdown from "./user-dropdown";
import { useSignInModal } from "./sign-in-modal";

import { Session } from "next-auth";
import { Button } from "@radix-ui/themes";

export default function Header({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const isScrolled = useScroll(50);

  return (
    <>
      <div
        className={`fixed top-0 w-full flex justify-center ${isScrolled ? "border-b border-gray-200 bg-white/50 backdrop-blur-2xl" : "bg-white/0"} z-30 transition-all`}>
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
              <a className="text-lg font-medium">
                <p>Dashboard</p>
              </a>
            </Link>
            <Link legacyBehavior href="/issuespage" passHref>
              <a className="text-lg font-medium">
                <p>Issues</p>
              </a>
            </Link>
          </div>
          
          {/* Right part of the Navbar: Session/User Dropdown */}
          <div>
            {session && (
              <UserDropdown session={session} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}