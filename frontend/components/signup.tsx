"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
            OptiWaste Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <Link href="/register/user" className="block">
            <Button className="w-full">
              Register as User
            </Button>
          </Link>
          <Link href="/register/collector" className="block">
            <Button className="w-full">
              Register as Collector
            </Button>
          </Link>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          <Link href="/login" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300">
            Already have an account? Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}