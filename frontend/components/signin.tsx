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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const errorMessage = await handleLogin({ email, password, isCollector });
      if (errorMessage !== null) {
        setError(errorMessage!);
      } else {
        setError(null);
        setIsDialogOpen(false);
      }
      
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">OptiWaste Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <Button
            onClick={() => { setIsCollector(false); setIsDialogOpen(true); }}
            className="w-full "
          >
            Login as User
          </Button>
          <Button
            onClick={() => { setIsCollector(true); setIsDialogOpen(true); }}
            className="w-full "
          >
            Login as Collector
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">

          <div> <Link href="/register" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300">
              Don't have an account? Get started
            </Link></div>
           
          
        </CardFooter>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTitle className="hidden">Sign In</DialogTitle>
        <DialogContent className="sm:max-w-[450px]">
          <div className="relative flex flex-col items-center gap-6 rounded-lg bg-background p-8 shadow-lg">
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">OptiWaste</span>
            </div>
            <span className="text-gray-600 dark:text-gray-300">{isCollector ? "Collector Login" : "User Login"}</span>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {error && <div className="flex items-center justify-between"><span className="text-red-500 text-sm">{error}</span></div>}
              
              <Button
                variant="outline"
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors duration-300"
              >
                {loading ? <CircleDashed className="animate-spin" /> : "Sign In"}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}