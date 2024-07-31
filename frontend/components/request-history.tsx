"use client"
import { SetStateAction, useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { X, Check, CircleDashed } from "lucide-react"
import { useRequest } from "@/contexts/request-context"
import PaymentComponent from "./payment"
import { useAuth } from "@/contexts/auth-context"
import { Textarea } from "@/components/ui/textarea"
import { updateFeedback } from "@/apis/api"
import Cookies from "js-cookie"


export function RequestHistory() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRequest, setSelectedRequest] = useState<{ id: number; address: string; status: string; pickupTime: string; } | null>(null)
  const [requestsPerPage, setRequestsPerPage] = useState(4)
  const { user } = useAuth();
  const { allRequests } = useRequest();
  const [openDrawer, setOpenDrawer] = useState<string | null>(null)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState("");




  const requests = Array.isArray(allRequests) ? allRequests : [];

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

}, []);

  
  const sortedRequests = requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const indexOfLastRequest = currentPage * requestsPerPage
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage
  const currentRequests = sortedRequests.slice(indexOfFirstRequest, indexOfLastRequest)

  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber)


  const handleFeedbackSubmit = async (id: string): Promise<void> => {
    console.log('submitting');
      const token = Cookies.get("token");
      const response = await updateFeedback(id, feedbackComment, token);
      console.log('feedback response', response);
      setIsFeedbackDialogOpen(false);
      setFeedbackComment("");
  
  };

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

              currentRequests.map((request: any) => (
                <div key={request._id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-medium">Request {request._id}</div>
                  <div className="text-muted-foreground">{request.address}</div>
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
                          <DrawerTitle className="text-xl">Request {request._id} Details</DrawerTitle>
                        </DrawerHeader>
                        <div className="px-4 py-6 space-y-4">
                          <div>
                            <div className="font-medium">Location</div>
                            <div>{request.address}</div>
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
                            <div className="font-medium">Payment Status</div>
                            <div className="text-green-500 font-medium">
                              {/* <request.icon className="w-4 h-4 inline-block mr-1" /> */}
                              {request.paymentStatus}
                            </div>
                          </div>
                          <Separator className="my-4" />
                          {(request.requestStatus === 'Collected') ?
                          (<><div>
                              <div className="font-medium">Feedback Comment</div>
                              <div>{request.feedbackComment}</div>
                            </div><Separator className="my-4" /></>)
                          :
                          (<div>
                            <div className="flex items-center justify-between">
                              <div className="font-medium">Scheduled Pickup</div>
                              <div>2024-07-15 10:00 AM</div>
                            </div>
                          </div>)
                          }
                          
                        <DrawerFooter>
                       
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setOpenDrawer(null)}
                              >
                                Close
                              </Button>

                              {request.requestStatus === 'Collected' && !request.feedback && (
                              <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button>Give Feedback</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Feedback</DialogTitle>
                                    <DialogDescription>
                                      Please rate your experience and provide any comments.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <Textarea
                                    placeholder="Your comments..."
                                    value={feedbackComment}
                                    onChange={(e) => setFeedbackComment(e.target.value)}
                                  />
                                  <DialogFooter>
                                    <Button onClick={() => handleFeedbackSubmit(request._id)}>Submit Feedback</Button>
                                    <DialogClose asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                            
                          

                        {(request.paymentStatus === 'unpaid') && (
              
              <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Make Payment</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Payment</DialogTitle>
                    <DialogDescription>
                    You are about to make a payment of GH₵{request.amount?.toFixed(2)} for {request.wasteType} waste collection.
                    </DialogDescription>
                  </DialogHeader>
                  <PaymentComponent
                    initialEmail={user?.email || ''}
                    initialAmount={request.amount?.toString()}
                    requestId={request._id}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              )}
                        </DrawerFooter>
                      </div>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
            ))
            )}
            </div>
            <div className="flex justify-center mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
                    </PaginationItem>
                    {[...Array(Math.ceil(requests.length / requestsPerPage))].map((_, index) => (
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
  )
}