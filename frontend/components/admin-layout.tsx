"use client"

import { ReactNode, useEffect, useState } from "react"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { House, ChartLine, Clipboard, Users, Truck, Money, Gear, SignOut, List, Trash } from "@phosphor-icons/react"
import { ModeToggle } from "./theme/mode-toggle"
import { useAuth } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/admin/dashboard", icon: House, label: "Dashboard" },
  { href: "/admin/dashboard/users", icon: Users, label: "Users" },
  { href: "/admin/dashboard/collectors", icon: Truck, label: "Collectors" },
  { href: "/admin/dashboard/requests", icon: Clipboard, label: "Requests" },
  { href: "/admin/dashboard/analytics", icon: ChartLine, label: "Analytics" },
  { href: "/admin/dashboard/payments", icon: Money, label: "Payments" },
  { href: "/admin/dashboard/settings", icon: Gear, label: "Settings" },
]

export function AdminLayout({ children }: { children: ReactNode }) {
  const { handleLogout }: { handleLogout: () => Promise<void> } = useAuth();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const currentTab = navItems.find(item => 
      item.href === "/admin/dashboard" 
        ? pathname === item.href 
        : pathname.startsWith(item.href)
    )?.label || "";
    console.log('Current Tab label:', currentTab);
    setActiveTab(currentTab);
  }, [pathname])

  // Debugging output to see the current state and path
  useEffect(() => {
    console.log('Current Pathname:', pathname);
    console.log('Active Tab:', activeTab);
  }, [activeTab, pathname]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background dark:bg-background-dark sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground-dark md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <Trash className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">OptiWaste</span>
            </Link>
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={`flex h-9 w-full items-center gap-2 rounded-lg px-3 transition-colors hover:text-foreground dark:hover:text-foreground-dark md:h-8 ${
                      activeTab === item.label
                        ? "bg-accent text-accent-foreground dark:bg-accent-dark dark:text-accent-foreground-dark"
                        : "text-muted-foreground dark:text-muted-foreground-dark"
                    }`}
                    prefetch={false}
                  >
                    <item.icon className="h-5 w-5" />
                    {/* <span>{item.label}</span> */}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground dark:text-muted-foreground-dark transition-colors hover:text-foreground dark:hover:text-foreground-dark md:h-8 md:w-8"
                >
                  <SignOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ModeToggle />
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background dark:bg-background-dark px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <List className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground dark:bg-primary-dark dark:text-primary-foreground-dark md:text-base"
                  prefetch={false}
                >
                  <Trash className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">OptiWaste</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-2.5 ${
                      activeTab === item.label
                        ? "text-foreground dark:text-foreground-dark"
                        : "text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark"
                    }`}
                    prefetch={false}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                  <img
                    src="/placeholder-user.jpg"
                    width="36"
                    height="36"
                    className="rounded-full"
                    alt="Avatar" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href="/admin/dashboard/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href="/admin/dashboard/settings">Settings</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><button onClick={handleLogout}>Logout</button></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
