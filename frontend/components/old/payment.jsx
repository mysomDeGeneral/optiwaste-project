"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    totalPayments: 0,
    pendingPayments: 0,
    successfulPayments: 0,
    failedPayments: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Number of items per page

  useEffect(() => {
    fetchPaystackPayments(currentPage);
    fetchTotalStats();
  }, [currentPage]);

  const fetchPaystackPayments = async (page) => {
    try {
      const response = await axios.get('https://api.paystack.co/transaction', {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
        },
        params: {
          perPage: pageSize,
          page: page,
        },
      });

      const paystackPayments = response.data.data;
      setPayments(paystackPayments);
      setTotalPages(Math.ceil(response.data.meta.total / pageSize));

    } catch (error) {
      console.error('Error fetching Paystack payments:', error);
    }
  };

  const fetchTotalStats = async () => {
    try {
      const response = await axios.get('https://api.paystack.co/transaction/totals', {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
        },
      });

      const { total_transactions, total_volume, pending_transfers, unique_customers } = response.data.data;

      setStats({
        totalPayments: total_volume / 100, 
        pendingPayments: pending_transfers,
        successfulPayments: total_transactions,
        failedPayments: 0, 
      });
    } catch (error) {
      console.error('Error fetching total stats:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <h1 className="text-4xl font-bold mb-4">Paystack Payments</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Payments</CardTitle>
            <CardDescription>The total amount of payments received.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">GH₵{stats.totalPayments.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Payments</CardTitle>
            <CardDescription>The number of payments that are still pending.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.pendingPayments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Successful Payments</CardTitle>
            <CardDescription>The number of payments that have been successfully processed.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.successfulPayments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Failed Payments</CardTitle>
            <CardDescription>The number of payments that have failed to process.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.failedPayments}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>View all payments made through Paystack.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>GH₵{(payment.amount / 100).toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={payment.status === 'success' ? 'secondary' : 'outline'}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.channel}</TableCell>
                  <TableCell>{payment.customer.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentPage;