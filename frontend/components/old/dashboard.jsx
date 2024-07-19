// pages/dashboard.js

//import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import React, { useContext, useEffect } from "react";
import { RequestContext } from "@/contexts/request-context";
import { CollectorContext } from "@/contexts/collector-context";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default function DashboardPage() {
  const { user, handleLogout } = useAuth();
  const router = useRouter();
  const { allRequests, loading: requestsLoading } = useContext(RequestContext);
  const { allCollectors, loadiing: collectorsLoading } = useContext(CollectorContext);


  useEffect(() => {
    const shouldRefresh = localStorage.getItem('shouldRefresh');  
    if (shouldRefresh === 'true') {
      localStorage.removeItem('shouldRefresh');
      router.refresh();
    }
  }, [router]);


  const pendingRequests = allRequests ? allRequests.filter((request) => request.requestStatus === "Pending") : [];
  const numberOfPendingRequests = pendingRequests.length;
  const numberOfCollectors = allCollectors ? allCollectors.length : 0;

  return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <Card className="col-span-1 md:col-span-1">
            <CardHeader>
              <CardTitle>Waste Collection by Type</CardTitle>
              <CardDescription>A breakdown of the types of waste collected.</CardDescription>
            </CardHeader>
            <CardContent>
              <DrawPieChart className="w-full aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-1">
            <CardHeader>
              <CardTitle>Collector Performance</CardTitle>
              <CardDescription>A chart showing the performance of collectors over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <DrawLineChart className="w-full aspect-[4/3]" />
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Payments Received</CardTitle>
              <CardDescription>View and manage your payment information.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>Total Payments Received</div>
                  <div className="text-4xl font-bold">$10,234.56</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Payment Method</div>
                  <div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Last Payment Received</div>
                  <div>June 1, 2024</div>
                </div>
                <Button className="w-full">View Payment History</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View your past payment transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>June 1, 2024</TableCell>
                    <TableCell>$1,234.56</TableCell>
                    <TableCell>
                      <Badge variant="success">Paid</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>May 1, 2024</TableCell>
                    <TableCell>$1,234.56</TableCell>
                    <TableCell>
                      <Badge variant="success">Paid</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>April 1, 2024</TableCell>
                    <TableCell>$1,234.56</TableCell>
                    <TableCell>
                      <Badge variant="success">Paid</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
  );
}

// function LineChart(props) {
//   return (
//     <div {...props}>
//       <ResponsiveLine
//         data={[
//           {
//             id: "Desktop",
//             data: [
//               { x: "Jan", y: 43 },
//               { x: "Feb", y: 137 },
//               { x: "Mar", y: 61 },
//               { x: "Apr", y: 145 },
//               { x: "May", y: 26 },
//               { x: "Jun", y: 154 },
//             ],
//           },
//           {
//             id: "Mobile",
//             data: [
//               { x: "Jan", y: 60 },
//               { x: "Feb", y: 48 },
//               { x: "Mar", y: 177 },
//               { x: "Apr", y: 78 },
//               { x: "May", y: 96 },
//               { x: "Jun", y: 204 },
//             ],
//           },
//         ]}
//         margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
//         xScale={{
//           type: "point",
//         }}
//         yScale={{
//           type: "linear",
//         }}
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickSize: 0,
//           tickPadding: 16,
//         }}
//         axisLeft={{
//           tickSize: 0,
//           tickValues: 5,
//           tickPadding: 16,
//         }}
//         colors={["#2563eb", "#e11d48"]}
//         pointSize={6}
//         useMesh={true}
//         gridYValues={6}
//         theme={{
//           tooltip: {
//             chip: {
//               borderRadius: "9999px",
//             },
//             container: {
//               fontSize: "12px",
//               textTransform: "capitalize",
//               borderRadius: "6px",
//             },
//           },
//           grid: {
//             line: {
//               stroke: "#f3f4f6",
//             },
//           },
//         }}
//         role="application"
//       />
//     </div>
//   );
// }

// function PieChart(props) {
//   return (
//     <div {...props}>
//       <ResponsivePie
//         data={[
//           { id: "Jan", value: 111 },
//           { id: "Feb", value: 157 },
//           { id: "Mar", value: 129 },
//           { id: "Apr", value: 150 },
//           { id: "May", value: 119 },
//           { id: "Jun", value: 72 },
//         ]}
//         sortByValue
//         margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
//         cornerRadius={0}
//         padAngle={0}
//         borderWidth={1}
//         borderColor={"#ffffff"}
//         enableArcLinkLabels={false}
//         arcLabel={(d) => `${d.id}`}
//         arcLabelsTextColor={"#ffffff"}
//         arcLabelsRadiusOffset={0.65}
//         colors={["#2563eb"]}
//         theme={{
//           labels: {
//             text: {
//               fontSize: "18px",
//             },
//           },
//           tooltip: {
//             chip: {
//               borderRadius: "9999px",
//             },
//             container: {
//               fontSize: "12px",
//               textTransform: "capitalize",
//               borderRadius: "6px",
//             },
//           },
//         }}
//         role="application"
//       />
//     </div>
//   );
// }

function DrawPieChart(props) {
  const data = [
    { name: 'Jan', value: 111 },
    { name: 'Feb', value: 157 },
    { name: 'Mar', value: 129 },
    { name: 'Apr', value: 150 },
    { name: 'May', value: 119 },
    { name: 'Jun', value: 72 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie dataKey="value" data={data} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

function DrawLineChart(props) {
  const data = [
    { name: 'Jan', Desktop: 43, Mobile: 60 },
    { name: 'Feb', Desktop: 137, Mobile: 48 },
    { name: 'Mar', Desktop: 61, Mobile: 177 },
    { name: 'Apr', Desktop: 145, Mobile: 78 },
    { name: 'May', Desktop: 26, Mobile: 96 },
    { name: 'Jun', Desktop: 154, Mobile: 204 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Desktop" stroke="#2563eb" />
        <Line type="monotone" dataKey="Mobile" stroke="#e11d48" />
      </LineChart>
    </ResponsiveContainer>
  );
}

