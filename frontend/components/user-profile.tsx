"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ModeToggle } from "./theme/mode-toggle"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"

export function UserProfile() {
    const { handleLogout } = useAuth();
    const [isEditing, setIsEditing] = useState(false)
    const [userInfo, setUserInfo] = useState({
      name: "Mysom",
      email: "mysom@example.com",
      phone: "555-1234567",
      address: "Ayeduase, Kumasi, Ghana"
    })
  
    const handleEdit = () => {
      setIsEditing(!isEditing)
    }
  
    const handleSave = () => {
      // Here you would typically send the updated info to your backend
      setIsEditing(false)
    }
  
    const handleChange = (e: { target: { name: any; value: any } }) => {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
  
    
  return (
    <main className="flex-1 overflow-y-auto flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="grid gap-6 p-4 md:p-6 w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-1">{userInfo.name}</h2>
              <p className="text-muted-foreground mb-6">{userInfo.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Personal Information</CardTitle>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {Object.entries(userInfo).map(([key, value], index) => (
                <div key={key}>
                  {index > 0 && <Separator className="my-2" />}
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize text-gray-600 dark:text-gray-400">{key}:</span>
                    {isEditing ? (
                      <Input
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="w-2/3"
                      />
                    ) : (
                      <span>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {isEditing && (
              <Button onClick={handleSave} className="mt-6 w-full">Save Changes</Button>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Dark Mode</span>
                <ModeToggle />
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Language</span>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="English" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent activity to display.</p>
          </CardContent>
        </Card>
        <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive"  className="w-full">Logout</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>You are about to be logged out!</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be sent to the login page.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>Yes</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
      </div>
    </main>
  )
}