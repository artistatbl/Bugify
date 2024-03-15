"use client";
import { TypewriterEffectSmooth } from "@/components/components/ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
	const words = [
	  {
	    text: "Track",
	  },
	  {
	    text: "and",
	  },
	  {
	    text: "fix",
	  },
	  {
	    text: "bug",
	  },
	  {
	    text: "faster.",
	    className: "text-blue-500 dark:text-blue-500",
	  },
	];
	return (
	  <div className="flex flex-col items-center justify-center h-[10rem]">
	    <TypewriterEffectSmooth words={words} />
	  </div>
	);
   }
   