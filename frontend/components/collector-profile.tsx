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
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ModeToggle } from "./theme/mode-toggle"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function CollectorProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "John Collector",
    email: "john@collector.com",
    phone: "555-1234567",
    address: "123 Main St, Anytown USA"
  })
  const [availabilityStatus, setAvailabilityStatus] = useState("available")

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

  const handleAvailabilityChange = (checked: any) => {
    setAvailabilityStatus(checked ? "available" : "unavailable")
  }

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...")
  }

  return (
    <main className="flex-1 overflow-y-auto flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="grid gap-6 p-4 md:p-6 w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JC</AvatarFallback>
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
                <Label htmlFor="availability" className="font-medium">Availability Status</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="availability"
                    checked={availabilityStatus === "available"}
                    onCheckedChange={handleAvailabilityChange}
                  />
                  <span className={availabilityStatus === "available" ? "text-green-500" : "text-red-500"}>
                    {availabilityStatus === "available" ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Dark Mode</span>
                <ModeToggle />
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Language</span>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
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
        <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" onClick={handleLogout} className="w-full">Logout</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
      </div>
    </main>
  )
}