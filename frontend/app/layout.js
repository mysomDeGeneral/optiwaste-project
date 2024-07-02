import { Inter as FontSans } from "next/font/google";
import "@/styles/global.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Root } from "postcss";
//const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  Variable: "--font-sans",
})

export const metadata = {
  title: "OptiWaste",
  description: "OptiWaste app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={(fontSans.Variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
