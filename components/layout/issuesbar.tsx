'use client';
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";

export default function IssuesNavBar() {
  // Example condition (you should define your own logic here)

  const isScrolled = useScroll(50);

  return (
    <>
      <div
        className={`fixed top-0 w-full flex justify-center ${isScrolled ? "} border-b border-gray-200 bg-white/50 backdrop-blur-2xl" : "bg-white/0"} z-30 transition-all`}>
        <div className="flex w-full  h-16 max-w-screen-xl items-center space-x-5 px-5 ">
          <Link  legacyBehavior href="/" passHref>
            <a className="">
              <Image
                src="/logo.png"
                alt="Logo"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
              />
            </a>
          </Link>
          <Link legacyBehavior href="/issues" passHref>
            <a className="ml-5">
              <p>Issues</p>
            </a>
          </Link>
          <Link legacyBehavior href="/dashboard" passHref>
            <a className="">
              <p>Dashboard</p>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
