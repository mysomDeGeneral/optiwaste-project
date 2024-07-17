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
import { useEffect, useState, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ModeToggle } from "./theme/mode-toggle"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useCollector } from "@/contexts/collector-context"


export function CollectorProfile() {
  const { updateProfile } = useCollector()
  const { user, handleLogout } = useAuth();
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    licenseID: "",
    address: "",
  })

  useEffect(() => {
    if(user) {
      setUserInfo({
        name: user?.name || "",
        email: user?.email || "",
        licenseID: user?.licenseId || "",
        address: user?.digitalAddress || "",
      })

      setAvailabilityStatus(user?.available || false)
    }
    }, [user])

  const [availabilityStatus, setAvailabilityStatus] = useState(user?.available || false)

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = async () => {
    try {
          setIsEditing(false);
          const updatedProfile = await updateProfile({...userInfo, available: availabilityStatus});
          setAvailabilityStatus(updatedProfile.available);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleAvailabilityChange =  async (checked: boolean) => {
    setAvailabilityStatus(checked)
    try {
      const updatedProfile = await updateProfile({ ...userInfo, available: checked });
      setAvailabilityStatus(updatedProfile.available);
    } catch (error) {
      console.error("Error updating status", error);
      setAvailabilityStatus(!checked)
    }
  }



  return (
    <main className="flex-1 overflow-y-auto flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="grid gap-6 p-4 md:p-6 w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2">
                <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} />
                <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
              <p className="text-muted-foreground mb-6">{user?.email}</p>
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
                    checked={availabilityStatus}
                    onCheckedChange={handleAvailabilityChange}
                  />
                  <span className={availabilityStatus ? "text-green-500" : "text-red-500"}>
                    {availabilityStatus ? "Available" : "Unavailable"}
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
                    <Button variant="destructive" className="w-full">Logout</Button>
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