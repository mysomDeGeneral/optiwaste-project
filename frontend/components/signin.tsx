"use client"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { CircleDashed } from "lucide-react";
import Link from "next/link";


export function SignIn() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCollector, setIsCollector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response: any = await handleLogin({ email, password, isCollector });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">OptiWaste</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={() => { setIsCollector(false); setIsDialogOpen(true); }}
            className="w-full"
          >
            Login as User
          </Button>
          <Button onClick={() => { setIsCollector(true); setIsDialogOpen(true); }}
            className="w-full"
          >
            Login as Collector
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          {
            isCollector ? (<Link href="/signup/collector" className="text-sm text-blue-600 hover:underline">
            Don't have an account? Get started
          </Link>) : (<Link href="/signup/user" className="text-sm text-blue-600 hover:underline">
            Don't have an account? Get started
          </Link>)
          }
          
        </CardFooter>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTitle className="hidden">Sign In</DialogTitle>
        <DialogContent className="sm:max-w-[450px]">
          <div className="relative flex flex-col items-center gap-6 rounded-lg bg-background p-8 shadow-lg">
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold">OptiWaste</span>
            </div>
            <span>{isCollector ? "Collector Login" : "User Login"}</span>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button variant="outline" type="submit" className="w-full">
                {
                  loading ? <CircleDashed className="animate-spin" /> : "Sign In"
                }

              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
