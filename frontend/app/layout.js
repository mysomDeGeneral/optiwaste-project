import { Inter as FontSans } from "next/font/google";
import "@/styles/global.css";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "@/components/Layout";
import { Root } from "postcss";
import Link from "next/link";
//const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  Variable: "--font-sans",
})

export const metadata = {
  title: "OptiWaste",
  description: "OptiWaste app",
};

export default function RootLayout({ auth, children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={(fontSans.Variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <nav>
            <Link href="/login">Open modal</Link>
          </nav> */}
          <div>{auth}</div>
            <div>{children}</div>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
