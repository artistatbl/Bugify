
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Theme, ThemePanel } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";





export const metadata = {
  title: "",
  description:
    "",
  metadataBase: new URL("https://precedent.dev"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en">


      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full  " />
        {/* <Suspense fallback="...">
       <IssuesNavBar />
      </Suspense> */}



        <Theme appearance="light" accentColor="sky" grayColor="olive" radius="medium" scaling="110%">
          <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
            {children}
          </main>
          {/* <ThemePanel /> */}
        </Theme>



        <Footer />

        <Analytics />
      </body>
    </html>





  );
}


