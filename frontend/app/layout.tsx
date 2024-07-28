import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { RequestProvider } from "@/contexts/request-context";
import { UserProvider } from "@/contexts/user-context";
import { CollectorProvider } from "@/contexts/collector-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Suspense, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OptiWaste",
  description: "A web application developed to facilitate waste collection requests",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["optiwaste", "waste-collection", "waste-request"],

  icons: [
    {
      rel: "icon",
      href: "favicon.ico",
      url: "favicon.ico",
    },
  ],
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
          <Suspense fallback={<div>Loading...</div>}>
            <AuthProvider>
              <RequestProvider>
                <UserProvider>
                  <CollectorProvider>

                    {children}

                  </CollectorProvider>
                </UserProvider>
              </RequestProvider>
            </AuthProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
