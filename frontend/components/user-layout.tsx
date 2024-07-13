/**
 * v0 by Vercel.
 * @see https://v0.dev/t/w1RpcKb1Edt
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Clipboard, History, CircleUserRound } from "lucide-react"

export default function UserLayout({ children } : { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <nav className="flex items-center justify-around bg-background border-t h-14 px-4 sm:px-6">
        <Link
          href="/user/request/history"
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <History className="w-5 h-5" />
          <span className="text-xs">History</span>
        </Link>
        <Link
          href="users/request"
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <Clipboard className="w-5 h-5" />
          <span className="text-xs">Request</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          <CircleUserRound className="w-5 h-5" />
          <span className="text-xs">Profile</span>
        </Link>
      </nav>
    </div>
  )
}











