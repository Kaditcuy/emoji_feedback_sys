"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";

interface Restaurant {
  id: number;
  name: string;
  location: string;
  avg_rating: number;
  total_ratings: number;
}

export default function TopRatedRestaurants() {
  const { toast } = useToast();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    async function fetchTopRestaurants() {
      try {
        const res = await fetch(`/api/top-rated-restaurants?page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch restaurants");
        const data = await res.json();
        
        setRestaurants(data.restaurants);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching top-rated restaurants:", error);
        toast({
          title: "Error",
          description: "Failed to load top-rated restaurants.",
          variant: "destructive",
        });
      }
    }
    fetchTopRestaurants();
  }, [page]);

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 flex h-16 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Top Rated Restaurants</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {restaurants.length === 0 ? (
              <Card className="w-full flex flex-col items-center p-6 border-dashed border-2 border-gray-300 text-center">
                <CardHeader className="flex items-center justify-center">
                  <Star className="h-12 w-12 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    No Top-Rated Restaurants Yet
                  </CardTitle>
                  <p className="text-gray-500 mt-2">
                    Be the first to rate a restaurant and help others find the best places to eat😊!
                  </p>
                  <Button className="mt-4" variant="outline">
                    <Link href="/dashboard">Rate a Restaurant</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Avg Rating</TableHead>
                      <TableHead>Total Ratings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {restaurants.map((restaurant) => (
                      <TableRow key={restaurant.id}>
                        <TableCell>{restaurant.name}</TableCell>
                        <TableCell>{restaurant.location}</TableCell>
                        <TableCell>{restaurant.avg_rating.toFixed(1)}/5</TableCell>
                        <TableCell>{restaurant.total_ratings}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            {total > 0 && (
              <div className="flex justify-center mt-4">
                <Button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
                  Previous
                </Button>
                <span className="mx-4">Page {page} of {Math.ceil(total / limit)}</span>
                <Button disabled={page * limit >= total} onClick={() => setPage((prev) => prev + 1)}>
                  Next
                </Button>
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
