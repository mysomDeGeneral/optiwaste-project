import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { RequestProvider } from "@/contexts/request-context";
import { UserProvider } from "@/contexts/user-context"; 
import { CollectorProvider } from "@/contexts/collector-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OptiWaste",
  description: "OptiWaste App",
  // icons: [
  //   {
  //     rel: "icon",
  //     href: "../public/optiwastelogo.png",
  //     url: "../public/optiwastelogo.png",
  //   },
  // ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <AuthProvider>
          <RequestProvider>
            <UserProvider>
              <CollectorProvider>
              <Suspense fallback={<div>Loading...</div>}>
              {children}
              </Suspense>
              </CollectorProvider>
            </UserProvider>
          </RequestProvider>
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
