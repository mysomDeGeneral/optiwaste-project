"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { X, Check, CircleDashed } from "lucide-react"
import { useRequest } from "@/contexts/request-context"

export function RequestHistory() {
  const { allRequests } = useRequest();
  const [openDrawer, setOpenDrawer] = useState<string | null>(null)

  const requests = Array.isArray(allRequests) ? allRequests : [];


  // const requests = [
  //   { id: "1", date: "June 15, 2023", status: "Scheduled", icon: Check, color: "text-green-500", location:"", type: "", instructions: "", quantity: "" },
  //   { id: "2", date: "May 30, 2023", status: "Pending", icon: CircleDashed, color: "text-yellow-500", location:"", type: "", instructions: "", quantity: ""  },
  //   { id: "3", date: "April 20, 2023", status: "Cancelled", icon: X, color: "text-red-500", location:"", type: "", instructions: "", quantity: ""  },
  // ]

  return (
    <main className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="grid gap-6 p-4 md:p-6 w-full max-w-4xl">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">All Waste Collection Requests</h1>
              <p className="text-muted-foreground md:text-xl">View and manage all your waste collection requests.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              { requests.length === 0 ? (
                <div className="text-center text-muted-foreground">You have no requests at the moment.</div>
              ) : (

              requests.map((request: any) => (
                <div key={request._id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-medium">Request #{request.id}</div>
                  <div className="text-muted-foreground">{request.digitalAddress}</div>
                  <div className="font-medium mt-2 flex items-center">
                    {/* <request.icon className="w-4 h-4 mr-1" /> */}
                    {request.requestStatus}
                  </div>
                  <Drawer open={openDrawer === request._id} onOpenChange={(open) => setOpenDrawer(open ? request._id : null)}>
                    <DrawerTrigger asChild>
                      <Button variant="link" className="mt-4 text-sm underline p-0">
                        View Details
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                          <DrawerTitle className="text-xl">Request #{request.id} Details</DrawerTitle>
                        </DrawerHeader>
                        <div className="px-4 py-6 space-y-4">
                          <div>
                            <div className="font-medium">Location</div>
                            <div>{request.digitalAddress}</div>
                          </div>
                          <Separator className="my-4" />
                          <div>
                            <div className="font-medium">Waste Type</div>
                            <div>{request.wasteType}</div>
                          </div>
                          <Separator className="my-4" />
                          <div>
                            <div className="font-medium">Special Instructions</div>
                            <div>{request.instructions}</div>
                          </div>
                          <Separator className="my-4" />
                          <div className="flex items-center justify-between">
                            <div className="font-medium">Status</div>
                            <div className="text-green-500 font-medium">
                              {/* <request.icon className="w-4 h-4 inline-block mr-1" /> */}
                              {request.requestStatus}
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div className="flex items-center justify-between">
                            <div className="font-medium">Scheduled Pickup</div>
                            <div>"2024-07-15 10:00 AM"</div>
                          </div>
                        </div>
                        <DrawerFooter>
                          <Button variant="outline" className="w-full">Cancel Request</Button>
                          <Button className="w-full">Make Payment</Button>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
            ))
            )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}