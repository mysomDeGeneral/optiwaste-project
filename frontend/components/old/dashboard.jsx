// pages/dashboard.js
"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useRequest } from "@/contexts/request-context"
import { CollectorContext } from "@/contexts/collector-context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import DrawPieChart from "@/components/DrawPieChart";
import DrawCollectorStatusPieChart from "@/components/DrawCollectorStatusPieChart";
import DrawRequestStatusPieChart from "@/components/DrawRequestStatusPieChart";
import DrawLineChart from "@/components/DrawLineChart";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import axios from "axios";


export default function DashboardPage() {
  const { user, handleLogout } = useAuth();
  const router = useRouter();
  const { allRequests } = useRequest();
  const { allCollectors } = useContext(CollectorContext);
  const [totalPayments, setTotalPayments] = useState(0);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const shouldRefresh = localStorage.getItem("shouldRefresh");
    if (shouldRefresh === "true") {
      localStorage.removeItem("shouldRefresh");
      router.refresh();
    }

    fetchPaystackPayments();
  }, [router]);

  const fetchPaystackPayments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.paystack.co/transaction', {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
        },});
      const transactions = response.data.data;

      const total = transactions.reduce((sum, transaction) => sum + transaction.amount / 100, 0);
      setTotalPayments(total);

      const history = transactions.map(transaction => ({
        date: new Date(transaction.paid_at).toLocaleDateString(),
        amount: transaction.amount / 100, // Convert from kobo to naira
        status: transaction.status
      }));
      setPaymentHistory(history);
    } catch (error) {
      console.error("Error fetching Paystack payments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const requests = Array.isArray(allRequests) ? allRequests : [];
  console.log('allRequests', requests);
  const collectors = Array.isArray(allCollectors) ? allCollectors : [];
  console.log('allCollectors', collectors);

  const pendingRequests = requests
    ? requests.filter((request) => request.requestStatus === "Pending")
    : [];
  const numberOfPendingRequests = pendingRequests.length;
  const numberOfCollectors = collectors ? collectors.length : 0;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
       <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Waste Collected</CardTitle>
            <CardDescription>The total amount of waste collected by all collectors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12,345 tons</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Collectors</CardTitle>
            <CardDescription>The number of collectors currently active and collecting waste.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{numberOfCollectors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
            <CardDescription>The number of waste collection requests that are still pending.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{numberOfPendingRequests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recycling Rate</CardTitle>
            <CardDescription>The percentage of collected waste that is being recycled.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">85%</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle>Waste Collection by Type</CardTitle>
            <CardDescription>A breakdown of the types of waste collected.</CardDescription>
          </CardHeader>
          <CardContent>
            <DrawPieChart data={requests} className="w-full aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-1">
          <CardHeader>
            <CardTitle>Collector Activity Status</CardTitle>
            <CardDescription>A chart showing the number of active vs inactive collectors.</CardDescription>
          </CardHeader>
          <CardContent>
            <DrawCollectorStatusPieChart data={collectors} className="w-full aspect-[4/3]" />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request Status Overview</CardTitle>
            <CardDescription>A breakdown of the status of all requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <DrawRequestStatusPieChart data={requests} className="w-full aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Collector Assignments Over Time</CardTitle>
            <CardDescription>The number of requests assigned to collectors over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <DrawLineChart data={requests} className="w-full aspect-[4/3]" />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payments Received</CardTitle>
            <CardDescription>View your Paystack payment information.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div>Loading payment data...</div>
            ) : (
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>Total Payments Received</div>
                  <div className="text-4xl font-bold">GH₵{totalPayments.toFixed(2)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Last Payment Received</div>
                  <div>{paymentHistory[0]?.date || 'N/A'}</div>
                </div>
                <Button className="w-full" onClick={() => router.push('/admin/dashboard/payments')}>View Full Payment History</Button>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest Paystack transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div>Loading transaction data...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.slice(0, 5).map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>GH₵{payment.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={payment.status === "success" ? "success" : "secondary"}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
          </main>
  );
}
