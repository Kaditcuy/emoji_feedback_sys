"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar"; // Import SidebarProvider

export default function SuperAdminDashboard() {
  const { toast } = useToast();
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = [
    { name: "Mon", restaurants: 40, users: 200 },
    { name: "Tue", restaurants: 35, users: 180 },
    { name: "Wed", restaurants: 50, users: 220 },
    { name: "Thu", restaurants: 45, users: 210 },
    { name: "Fri", restaurants: 60, users: 250 },
  ];

  const handleAddRestaurant = async () => {
    if (!restaurantName || !restaurantDescription || !restaurantLocation) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: restaurantName,
          description: restaurantDescription,
          location: restaurantLocation,
        }),
      });

      if (!response.ok) throw new Error("Failed to add restaurant");

      const result = await response.json();
      toast({
        title: "Success",
        description: `Restaurant added successfully! PIN: ${result.pin}`,
      });

      // Clear form fields
      setRestaurantName("");
      setRestaurantDescription("");
      setRestaurantLocation("");
    } catch (error) {
      console.error("Error adding restaurant:", error);
      toast({
        title: "Error",
        description: "Failed to add restaurant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SidebarProvider> {/* Wrap the entire component with SidebarProvider */}
      <div className="flex h-screen">
        <AppSidebar /> {/* Use AppSidebar inside SidebarProvider */}
        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-2xl font-semibold">Admin --FingerGod&apos;s Dashboard</h1>

          {/* Add Restaurant Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Restaurant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Restaurant Name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
              />
              <Input
                placeholder="Restaurant Description"
                value={restaurantDescription}
                onChange={(e) => setRestaurantDescription(e.target.value)}
              />
              <Input
                placeholder="Restaurant Location"
                value={restaurantLocation}
                onChange={(e) => setRestaurantLocation(e.target.value)}
              />
              <Button onClick={handleAddRestaurant} disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Restaurant"}
              </Button>
            </CardContent>
          </Card>

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
    </SidebarProvider>
  );
}