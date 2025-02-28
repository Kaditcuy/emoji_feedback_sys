"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function CommunitySentimentPage() {
  const [restaurants, setRestaurants] = useState<
    { restaurant_name: string; sentiment: { positive: number; neutral: number; negative: number }; totalFeedback: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSentiment() {
      try {
        const res = await fetch("/api/community-sentiment");
        if (!res.ok) throw new Error("Failed to fetch sentiment data");
        const data = await res.json();
        
        if (data.restaurants) {
          setRestaurants(data.restaurants);
        }
      } catch (error) {
        console.error("Error fetching sentiment data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSentiment();
  }, []);

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
                  <BreadcrumbPage>Community Sentiment</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col p-4 overflow-y-auto max-h-screen">
            {loading ? (
              <p className="text-center text-gray-500">Loading sentiment data...</p>
            ) : restaurants.length === 0 ? (
              <p className="text-center text-gray-500">No feedback available yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto max-h-[80vh]">
                {restaurants.map(({ restaurant_name, sentiment, totalFeedback }) => (
                  <Card key={restaurant_name} className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {restaurant_name}
                        <Badge variant="outline">{totalFeedback} Feedback Entries</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Positive Feedback 😊</p>
                        <Progress value={(sentiment.positive / totalFeedback) * 100 || 0} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Neutral Feedback 😐</p>
                        <Progress value={(sentiment.neutral / totalFeedback) * 100 || 0} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Negative Feedback 😢</p>
                        <Progress value={(sentiment.negative / totalFeedback) * 100 || 0} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
