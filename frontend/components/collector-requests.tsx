/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/KSrJY5Ij0Ca
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"
import { SetStateAction, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { useRequest } from "@/contexts/request-context"

// // Mock data for requests
// const mockRequests = [
//   { id: 1, address: "AOK6806973", status: "Pending", pickupTime: "2024-07-15 10:00 AM" },
//   { id: 2, address: "AE08423132", status: "Accepted", pickupTime: "2024-07-16 2:30 PM" },
//   { id: 3, address: "AT03613653", status: "Rejected", pickupTime: "2024-07-17 9:00 AM" },
//   { id: 4, address: "AC08832667", status: "Pending", pickupTime: "2024-07-15 10:00 AM" },
//   { id: 5, address: "AH05597737, Somewhere City", status: "Accepted", pickupTime: "2023-07-16 2:30 PM" },
//   { id: 6, address: "789 Elm St, Othertown", status: "Rejected", pickupTime: "2023-07-17 9:00 AM" },
//   { id: 7, address: "123 Main St, Anytown USA", status: "Pending", pickupTime: "2023-07-15 10:00 AM" },
//   { id: 8, address: "456 Oak Rd, Somewhere City", status: "Accepted", pickupTime: "2023-07-16 2:30 PM" },
//   { id: 9, address: "789 Elm St, Othertown", status: "Rejected", pickupTime: "2023-07-17 9:00 AM" },
//   // ... add more mock requests here
// ]

export function Requests() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRequest, setSelectedRequest] = useState<{ id: number; address: string; status: string; pickupTime: string; } | null>(null)
  const [requestsPerPage, setRequestsPerPage] = useState(4)
  const router = useRouter()
  const { allRequests } = useRequest();

  console.log("requests:", allRequests);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setRequestsPerPage(6)
      } else if (window.innerWidth >= 768) {
        setRequestsPerPage(4)
      } else {
        setRequestsPerPage(4)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)

  }, [])

  const indexOfLastRequest = currentPage * requestsPerPage
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage
  const currentRequests = allRequests.slice(indexOfFirstRequest, indexOfLastRequest)

  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber)

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Assigned":
        return "outline"
      case "Accepted":
        return "secondary"
      case "Rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleNavigation = (address: string) => {
    router.push(`route/${address}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 overflow-y-auto flex items-center justify-center">
        <div className="grid gap-4 p-4 md:p-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {currentRequests.map((request : any) => (
                  <Dialog key={request._id}>
                    <DialogTrigger asChild>
                      <div className="flex flex-col gap-2 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => setSelectedRequest(request)}>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{request.digitalAddress}</div>
                          <Badge variant={getBadgeVariant(request.status)}>{request.requestStatus}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Pickup Time: {request.pickupTime || "2024-07-15 10:00 AM"}</div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request Details</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-bold">Address:</span>
                          <span className="col-span-3">{request.digitalAddress}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-bold">Status:</span>
                          <span className="col-span-3">
                            <Badge variant={getBadgeVariant(request.status)}>{request.requestStatus}</Badge>
                          </span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-bold">Pickup Time:</span>
                          <span className="col-span-3">{request.pickupTime || "2024-07-15 10:00 AM"}</span>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => console.log("Accept request", request._id)}>Accept</Button>
                        <Button variant="destructive" onClick={() => console.log("Reject request", request._id)}>Reject</Button>
                        <Button variant="secondary" onClick={() => handleNavigation(request.digitalAddress)}>Navigate</Button>
                        <DialogClose asChild>
                          <Button variant="secondary">Close</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
                    </PaginationItem>
                    {[...Array(Math.ceil(allRequests.length / requestsPerPage))].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink onClick={() => paginate(index + 1)} isActive={currentPage === index + 1}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext onClick={() => paginate(currentPage + 1)} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}