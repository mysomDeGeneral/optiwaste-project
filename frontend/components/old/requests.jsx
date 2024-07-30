"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useRequest } from "@/contexts/request-context"

export function RequestsPage() {
  const { allRequests } = useRequest();
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);
  const [selectedType, setSelectedType] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredRequests = useMemo(() => {
    if (!Array.isArray(allRequests)) return [];
    return selectedType === "all"
      ? allRequests
      : allRequests.filter((request) => request.wasteType.toLowerCase() === selectedType.toLowerCase());
  }, [allRequests, selectedType]);

  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);

  const handleTypeFilter = (type) => {
    setSelectedType(type);
  }

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
    console.log('request:', request);
  }

  const totalRequests = allRequests?.length || 0;
  const plasticRequests = allRequests?.filter((request) => request.wasteType.toLowerCase() === "plastic").length || 0;
  const domesticRequests = allRequests?.filter((request) => request.wasteType.toLowerCase() === "domestic").length || 0;
  const metalRequests = allRequests?.filter((request) => request.wasteType.toLowerCase() === "metal").length || 0;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="text-4xl font-bold mb-4">Requests</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalRequests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plastic Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{plasticRequests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Domestic Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{domesticRequests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Metal Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{metalRequests}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Requests</CardTitle>
          <CardDescription>View and manage all requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={selectedType === "all" ? "secondary" : "outline"}
                onClick={() => handleTypeFilter("all")}>
                All
              </Button>
              <Button
                variant={selectedType === "plastic" ? "secondary" : "outline"}
                onClick={() => handleTypeFilter("plastic")}>
                Plastic
              </Button>
              <Button
                variant={selectedType === "domestic" ? "secondary" : "outline"}
                onClick={() => handleTypeFilter("domestic")}>
                Domestic
              </Button>
              <Button
                variant={selectedType === "metal" ? "secondary" : "outline"}
                onClick={() => handleTypeFilter("metal")}>
                Metal
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRequests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request._id}</TableCell>
                  <TableCell>{request.wasteType}</TableCell>
                  <TableCell>
                    <Badge variant={request.requestStatus === "Pending" ? "secondary" : "outline"}>{request.requestStatus}</Badge>
                  </TableCell>
                  <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleViewRequest(request)}>
                  View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button 
                key={page} 
                onClick={() => handlePageChange(page)}
                variant={currentPage === page ? "default" : "outline"}
                className="mx-1"
              >
                {page}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>
              Viewing details for request ID: {selectedRequest?._id}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="mt-4">
              <p><strong>Waste Type:</strong> {selectedRequest.wasteType}</p>
              <p><strong>Status:</strong> {selectedRequest.requestStatus}</p>
              <p><strong>Address:</strong> {selectedRequest.address}</p>
              <p><strong>Date:</strong> {new Date(selectedRequest.createdAt).toLocaleString()}</p>
              <p><strong>User:</strong> {selectedRequest.user?.name || 'N/A'}</p>
              <p><strong>Collector:</strong> {selectedRequest.collector?.name || 'Not assigned'}</p>
              {/* Add more fields as needed */}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
