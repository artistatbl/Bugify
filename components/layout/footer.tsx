import ChangelogPage from "@/app/changelog/page";
import Image from "next/image";


export default function Footer() {
  return (
    <div className="absolute w-full py-5 text-center  dark:bg-black    ">
    <div className="flex flex-col  relative justify-center  text-center">
      <p className="text-gray-500 text-md dark:text-white  font-medium ">
         project by{" "}
        <a
          className=" font-bold text-gray-600 dark:text-white underline-offset-2 transition-colors hover:underline"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jean Daly
        </a>
      </p>
      
      <div className="mt-4 md:mt-0 text-md ">
        <a
          className="text-gray-500  dark:text-white font-medium hover:underline"
          href="/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        <span className="text-gray-500 dark:text-white mx-2 text-sm">•</span>
        <a
          className="text-gray-500 text-md dark:text-white font-medium hover:underline"
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy


          
        </a>
        <span className="text-gray-500 dark:text-white  mx-2 text-sm">•</span>

        <a className="relative justify-center text-center">


        <ChangelogPage />
        </a>

       


  

       

     
      

        
      </div>
    </div>
  </div>
  

  );
}
