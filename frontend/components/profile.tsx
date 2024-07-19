// pages/profile.js or pages/profile.tsx
"use client"
// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
//import ProtectRoute from "../components/protectRoute"; 
import React, {useEffect} from "react";
import { useAuth } from "@/contexts/auth-context";


const ProfilePage = () => {
  const { user, fetchUserProfile, token } = useAuth();

  useEffect(() => {
     fetchUserProfile(token);
  }, [fetchUserProfile, token]);



  function getMonthNameAndYear(isoDate: string): string {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return date.toLocaleString('default', options);
  }

  const monthAndYear = user?.dateJoined ? getMonthNameAndYear(user.dateJoined) : "";

  if (!user) return null;

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background dark:bg-background-dark">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Your Profile</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Manage your personal information and settings.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Change Password
                </Button>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <h3 className="text-sm font-medium">About</h3>
                  <p className="text-sm text-muted-foreground">
                    I am the admin of OptiWaste, a platform that helps businesses manage their waste and recycling.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-sm font-medium">Contact</h3>
                  <p className="text-sm text-muted-foreground">{user?.mobile}</p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-sm font-medium">Location</h3>
                  <p className="text-sm text-muted-foreground">{user?.address}</p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-sm font-medium">Joined</h3>
                  <p className="text-sm text-muted-foreground">{monthAndYear}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage; 