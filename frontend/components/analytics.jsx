"use client"

import { useContext } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useRequest } from "@/contexts/request-context"
import { CollectorContext } from "@/contexts/collector-context";

export function Analytics() {
  const { allRequests } = useRequest();
  const { allCollectors } = useContext(CollectorContext);


  // Analysis Data
  const totalRequests = allRequests.length

  const requestsByType = allRequests.reduce((acc, request) => {
    acc[request.wasteType] = (acc[request.wasteType] || 0) + 1
    return acc
  }, {})

  const requestsByStatus = allRequests.reduce((acc, request) => {
    acc[request.requestStatus] = (acc[request.requestStatus] || 0) + 1
    return acc
  }, {})

  const requestsByMonth = allRequests.reduce((acc, request) => {
    const month = new Date(request.createdAt).toLocaleString('default', { month: 'short' })
    acc[month] = (acc[month] || 0) + 1
    return acc
  }, {})

  const collectorsAvailability = allCollectors.reduce((acc, collector) => {
    acc[collector.available ? 'Available' : 'Not Available'] = (acc[collector.available ? 'Available' : 'Not Available'] || 0) + 1
    return acc
  }, {})

  // Data Formatting for Charts
  const formattedRequestsByType = Object.keys(requestsByType).map(key => ({ name: key, count: requestsByType[key] }))
  const formattedRequestsByStatus = Object.keys(requestsByStatus).map(key => ({ name: key, count: requestsByStatus[key] }))
  const formattedRequestsByMonth = Object.keys(requestsByMonth).map(key => ({ name: key, count: requestsByMonth[key] }))
  const formattedCollectorsAvailability = Object.keys(collectorsAvailability).map(key => ({ name: key, count: collectorsAvailability[key] }))

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <h1 className="text-4xl font-bold mb-4">Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalRequests}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>View analytics on requests and collectors.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-2">Requests by Type</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formattedRequestsByType}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Requests by Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={formattedRequestsByStatus} dataKey="count" nameKey="name" fill="#2563eb" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-2">Requests by Month</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formattedRequestsByMonth}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Collectors Availability</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={formattedCollectorsAvailability} dataKey="count" nameKey="name" fill="#2563eb" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
