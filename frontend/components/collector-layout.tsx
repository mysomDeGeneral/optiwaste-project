"use client"
import Link from "next/link"
import { Clipboard, MapIcon, CircleUserRound } from "lucide-react"
import { usePathname } from "next/navigation"

export default function UserLayout({ children } : { children: React.ReactNode }) {
  const pathname = usePathname()

  const tabs = [
    { href: "#", icon: MapIcon, label: "Route" },
    { href: "#", icon: Clipboard, label: "Requests" },
    { href: "#", icon: CircleUserRound, label: "Profile" },
  ]

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <nav className="flex items-center justify-around bg-background border-t h-14 px-4 sm:px-6">
        {tabs.map((tab) =>
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center w-full h-full gap-1
              ${pathname === tab.href
                ? 'text-primary border-t-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'}`}  
            prefetch={false}
          >
            <tab.icon className={`w-5 h-5 ${pathname === tab.href ? 'text-primary' : ''}`} /> 
            <span className={`text-xs ${pathname === tab.href ? 'font-medium' : ''}`}>{tab.label}</span> 
            </Link>   
          )}
      </nav>
    </div>
  )
}











