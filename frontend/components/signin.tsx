"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { CircleDashed } from "lucide-react";


export function SignIn() {
  const { handleLogin }: { handleLogin: (credentials: { email: string, password: string}) => Promise<void> } = useAuth();
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
      await handleLogin({ email, password});
      console.log("Login successful");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // const openLoginDialog = (collector: boolean) => {
  //   setIsCollector(collector);
  //   setIsDialogOpen(true);
  // };

  return (
    <>
      <Button onClick={() => { setIsCollector(false); setIsDialogOpen(true); }}>Login as User</Button>
      <Button onClick={() => { setIsCollector(true); setIsDialogOpen(true); }}>Login as Collector</Button>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
    </>
  );
}
