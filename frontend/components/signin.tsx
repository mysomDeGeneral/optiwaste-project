"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/contexts/auth-context";

export function SignIn() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
    await handleLogin({ email, password });
    } catch (error) {
      console.error("login error:", error);
    }

  };

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[450px]">
        <div className="relative flex flex-col items-center gap-6 rounded-lg bg-background p-8 shadow-lg">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold">OptiWaste</span>
          </div>
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
              Sign In
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
