import Image from "next/image";


export default function Footer() {
  return (
    <div className="absolute w-full py-5 text-center ">
    <div className="flex flex-col md:flex-row justify-center space-x-8 md:space-x-16">
      <p className="text-gray-500">
        A project by{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://twitter.com/steventey"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jean Daly
        </a>
      </p>
      
      <div className="mt-4 md:mt-0">
        <a
          className="text-gray-500 font-semibold hover:underline"
          href="/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        <span className="text-gray-500 mx-2">•</span>
        <a
          className="text-gray-500 font-semibold hover:underline"
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  </div>
  

  );
}
