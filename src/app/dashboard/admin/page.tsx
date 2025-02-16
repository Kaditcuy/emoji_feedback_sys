import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function SuperAdminDashboard() {
  const data = [
    { name: "Mon", restaurants: 40, users: 200 },
    { name: "Tue", restaurants: 35, users: 180 },
    { name: "Wed", restaurants: 50, users: 220 },
    { name: "Thu", restaurants: 45, users: 210 },
    { name: "Fri", restaurants: 60, users: 250 },
  ];

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Admin --FingerGod's Dashboard</h1>

        {/* Overview Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Restaurants</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">150</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">12,500</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-green-600">10,200</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-yellow-500">5</CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="restaurants" stroke="#4CAF50" strokeWidth={2} />
                <Line type="monotone" dataKey="users" stroke="#2196F3" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Reports & Management Section */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Manage reports, users, and approvals.</p>
            <Button variant="outline">Manage Now</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
