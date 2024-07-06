"use client"

import { Trash } from "@phosphor-icons/react"

export default function Component() {
  
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="flex flex-col items-center space-y-4">
                    <Trash className="h-8 w-8 animate-spin" />
                    <h2 className="text-2xl font-bold">Loading...</h2>
                    <p className="text-muted-foreground">Please wait while we load the Optiwaste application.</p>
                </div>
        </div>
    )
}