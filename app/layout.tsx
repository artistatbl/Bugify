
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Theme, ThemePanel } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/components/ui/theme-provider";

import { Toaster } from "@/components/components/ui/toaster";
import { ModeToggle } from "@/components/components/ui/darkmode";
import Providers from "./Providers";





export const metadata = {
  title: "",
  description:
    "",
  metadataBase: new URL("https://bugify.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children, 
}: {
  children: React.ReactNode;
  
}) {
  return (

    <html lang="en" suppressHydrationWarning >

  


      <body className={cx(sfPro.variable, inter.variable)}>
      
        <ThemeProvider
      
         attribute="class"
         defaultTheme="light"
         enableSystem
         disableTransitionOnChange
        >
            <div className="fixed h-screen w-full  " />
      

        <Theme  accentColor="sky" grayColor="olive" radius="medium" scaling="110%">
        <Providers>
      
          <main className=" min-h-screen  flex-col  py-28  w-full dark:bg-black  dark:bg-dot-white/[0.3] bg-dot-black/[0.3]  flex items-center justify-center">
            {children}
            
          </main>
          </Providers>
          <Toaster />
          <Footer />
        </Theme>
        <Analytics />
        </ThemeProvider >
    
      </body>
    </html>
  );
}


