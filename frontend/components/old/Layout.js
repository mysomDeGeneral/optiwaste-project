import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/theme/mode-toggle";
// import NavigationLink from "./navigation-link";

const Layout = ({ children, currentPath }) => {
    const activeClassName = "bg-accent text-accent-foreground";

    const navigationLinks = [
        { path: "/", label: "OptiWaste", icon: Package2Icon },
        { path: "/dashboard", label: "Dashboard", icon: HomeIcon },
        { path: "/dashboard/users", label: "Users", icon: UsersIcon },
        { path: "/dashboard/collectors", label: "Collectors", icon: TruckIcon },
        { path: "/dashboard/requests", label: "Requests", icon: ClipboardIcon },
        { path: "/dashboard/analytics", label: "Analytics", icon: LineChartIcon },
        { path: "/dashboard/payments", label: "Payments", icon: DollarSignIcon },
        { path: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
    ];

    const getBreadcrumb = (path) => {
        // Extract breadcrumb items based on path segments
        const items = path?.split("/")?.slice(2);
        return items?.map((item, index) => (
            <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                    <Link href={`/${items.slice(0, index + 1).join("/")}`} prefetch={false}>
                        {item}
                    </Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
        ));
    };

    const NavigationLink = ({ href, label, icon }) => {
        const isActive = currentPath === href;
      
        return (
          <Link href={href} prefetch={false} className={`px-3 py-2 rounded hover:bg-accent ${isActive ? activeClassName : ''}`}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              {icon ? <icon className="h-5 w-5" /> : null}
              <span className="sr-only">{label}</span>
            </div>
          </Link>
        );
      };
    


    return (
        <div className=" dark:bg-black flex min-h-screen w-full flex-col bg-muted/40">
            <aside
                className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                      
                        <NavigationLink 
                            href="/"
                            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                            prefetch={false}> 
                            <Package2Icon className="h-5 w-5" />
                            <span className="sr-only">OptiWaste</span>
                        </NavigationLink>
                            
                        
                
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/dashboard"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}>
                                    <HomeIcon className="h-5 w-5" />
                                    <span className="sr-only">Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Dashboard</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/dashboard/users"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}>
                                    <UsersIcon className="h-5 w-5" />
                                    <span className="sr-only">Users</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Users</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/dashboard/collectors"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}>
                                    <TruckIcon className="h-5 w-5" />
                                    <span className="sr-only">Collectors</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Collectors</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/dashboard/requests"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}>
                                    <ClipboardIcon className="h-5 w-5" />
                                    <span className="sr-only">Requests</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Requests</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/dashboard/analytics"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}
                                >
                                    <LineChartIcon className="h-5 w-5" />
                                    <span className="sr-only">Analytics</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Analytics</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/dashboard/payments"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}>
                                    <DollarSignIcon className="h-5 w-5" />
                                    <span className="sr-only">Payments</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Payments</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/dashboard/settings"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}>
                                    <SettingsIcon className="h-5 w-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}>
                                    <LogOutIcon className="h-5 w-5" />
                                    <span className="sr-only">Logout</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Logout</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header
                    className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <MenuIcon className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="/"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                    prefetch={false}>
                                    <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">OptiWaste</span>
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}>
                                    <HomeIcon className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/dashboard/users"
                                    className="flex items-center gap-4 px-2.5 bg-accent text-accent-foreground"
                                    prefetch={false}>
                                    <UsersIcon className="h-5 w-5" />
                                    Users
                                </Link>
                                <Link
                                    href="/dashboard/collectors"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}>
                                    <TruckIcon className="h-5 w-5" />
                                    Collectors
                                </Link>
                                <Link
                                    href="/dashboard/requests"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}>
                                    <ClipboardIcon className="h-5 w-5" />
                                    Requests
                                </Link>
                                <Link
                                    href="/dashboard/analytics"
                                    className="flex items-center gap-4 px-2.5 bg-accent text-accent-foreground"
                                    prefetch={false}
                                >
                                    <LineChartIcon className="h-5 w-5" />
                                    Analytics
                                </Link>
                                <Link
                                    href="/dashboard/payments"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}>
                                    <DollarSignIcon className="h-5 w-5" />
                                    Payments
                                </Link>
                                <Link
                                    href="/dashboard/settings"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}>
                                    <SettingsIcon className="h-5 w-5" />
                                    Settings
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>{getBreadcrumb(currentPath)}</BreadcrumbList>
                    </Breadcrumb>
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
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem><Link href="/dashboard/settings">Settings</Link></DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <ModeToggle />
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;

function Package2Icon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16.5 9.4 7.5 4.21" />
            <path d="M21 16V8a2 2 0 0 0-1-1.73L12 1 4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73L12 23l8-4.27A2 2 0 0 0 21 16z" />
            <line x1="3.27" y1="6.96" x2="12" y2="12.01" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
            <line x1="20.73" y1="6.96" x2="12" y2="12" />
            <polyline points="3.27 6.96 7.5 4.21 16.5 9.4 20.73 6.96" />
        </svg>
    );
}

function HomeIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7" />
            <path d="M9 22V12h6v10" />
        </svg>
    );
}

function UsersIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function TruckIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
    );
}

function ClipboardIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 3h-4a2 2 0 0 0-4 0H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
            <line x1="9" y1="12" x2="15" y2="12" />
            <line x1="9" y1="16" x2="15" y2="16" />
            <line x1="11" y1="8" x2="13" y2="8" />
        </svg>
    );
}

function SettingsIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a1.65 1.65 0 0 1-2.32 2.32l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-.95 1.51V20a1.65 1.65 0 0 1-3.3 0v-.09a1.65 1.65 0 0 0-.95-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a1.65 1.65 0 0 1-2.32-2.32l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-.95H4a1.65 1.65 0 0 1 0-3.3h.09a1.65 1.65 0 0 0 1.51-.95 1.65 1.65 0 0 0-.33-1.82l-.06-.06a1.65 1.65 0 0 1 2.32-2.32l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 .95-1.51V4a1.65 1.65 0 0 1 3.3 0v.09a1.65 1.65 0 0 0 .95 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a1.65 1.65 0 0 1 2.32 2.32l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51.95H20a1.65 1.65 0 0 1 0 3.3h-.09a1.65 1.65 0 0 0-1.51.95z" />
        </svg>
    );
}

function LogOutIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    );
}

function MenuIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    );
}

function DollarSignIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>)
    );
}

function LineChartIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
        </svg>
    )
}
