'use client';
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { Button } from "@radix-ui/themes";
import { ModeToggle } from "../components/ui/darkmode";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center border-b-2 border-black dark:border-white ${
          scrolled ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl" : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link legacyBehavior href="/" passHref>
            <a className="flex items-center font-display text-2xl">
              <Image
                src="/logo.png"
                alt="Precedent logo"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
              />
              Bugify
            </a>
          </Link>
          <div className="flex items-center">
            {/* Sign In Button */}
            <Button
              className="rounded-full border cursor-pointer border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-black hover:text-white"
              onClick={() => setShowSignInModal(true)}
            >
              Sign In
            </Button>
            {/* Space between Button and ModeToggle */}
            <div className="mx-4"> {/* This div wraps ModeToggle and applies margin on both sides */}
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
