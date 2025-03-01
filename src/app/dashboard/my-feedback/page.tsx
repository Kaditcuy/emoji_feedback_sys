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

interface Feedback {
  id: number;
  restaurant_name: string;
  emoji: string;
  rating: number;
  created_at: string;
}

export default function FeedbackHistory() {
  const { toast } = useToast();
  const [feedbackHistory, setFeedbackHistory] = useState<Feedback[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    async function fetchFeedbackHistory() {
      try {
        const sessionRes = await fetch("/api/auth/check-session", { credentials: "include" });
        if (!sessionRes.ok) throw new Error("Failed to fetch session");
        const sessionData = await sessionRes.json();
        if (!sessionData?.user.user_id) throw new Error("User not logged in");

        const res = await fetch(`/api/feedback-history?page=${page}&limit=${limit}`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch feedback history");
        const data = await res.json();
        
        setFeedbackHistory(data.feedback);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching feedback history:", error);
        toast({
          title: "Error",
          description: "Failed to load feedback history.",
          variant: "destructive",
        });
      }
    }
    fetchFeedbackHistory();
  }, [page, toast]);

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
                  <BreadcrumbPage>My Feedback History</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {feedbackHistory.length === 0 ? (
              <p className="text-center text-gray-500">No feedback history available.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Restaurant</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>💀👽👀</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedbackHistory.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell>{feedback.restaurant_name}</TableCell>
                        <TableCell>{feedback.rating}/5</TableCell>
                        <TableCell>{feedback.emoji}</TableCell>
                        <TableCell>{new Date(feedback.created_at).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="flex justify-center mt-4">
              <Button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
                Previous
              </Button>
              <span className="mx-4">Page {page} of {Math.ceil(total / limit)}</span>
              <Button disabled={page * limit >= total} onClick={() => setPage((prev) => prev + 1)}>
                Next
              </Button>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
