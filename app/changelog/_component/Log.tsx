"use client";
import React from "react";
import { sfPro } from "@/app/fonts/index";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/components/ui/tracing-beam";

export function TracingBeamDemo() {
  // Function to safely create HTML content
  const createMarkup = (htmlContent: string) => {
	// Create a temporary div element to manipulate the HTML string
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = htmlContent;
   
	// Find all <a> tags and add a class
	tempDiv.querySelectorAll('a').forEach(a => {
	  a.classList.add('text-blue-500'); // TailwindCSS class for blue color, adjust as needed
	});
   
	// Return the modified HTML as an object suitable for dangerouslySetInnerHTML
	return { __html: tempDiv.innerHTML };
   };

  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className={twMerge(sfPro.className, "text-xl mb-4")}>
              {item.title}
            </p>

            <div className="text-sm prose prose-sm dark:prose-invert">
              <div dangerouslySetInnerHTML={createMarkup(item.description1)} />
              <br />
              <div dangerouslySetInnerHTML={createMarkup(item.description3)} />
              <br />
              <div dangerouslySetInnerHTML={createMarkup(item.description)} />
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: "Mar 12, 2024",
    description: `Changed the format for the changelog. This change was made to improve the readability and organization of the changelog. <a href='https://github.com/artistatbl/Bugify/commit/8e2ee3959305dd0b97e9e3c27d8ffaabbee0ca33'>  (#8e2ee39) </a>`,
    description1: "Removed the old changelog. The old changelog was no longer relevant and was causing confusion.",
    description3: "Added pop up changelog. This change was made to provide a more user-friendly way to view the changelog.",
    badge: "Changelog v0.1.0",
  },
];