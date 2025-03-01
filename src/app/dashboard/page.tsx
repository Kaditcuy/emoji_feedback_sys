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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input, Textarea } from "@/components/ui/input"; // Add this import for the PIN input
import { useToast } from "@/hooks/use-toast";

const emojis = ["🤬", "😡", "👎", "😞", "😢", "🙁", "😐", "🤷", "😕", "🙂", "😀", "🤗", "😍", "😊", "😃", "👍", "🥰"];

interface Restaurant {
  id: number;
  name: string;
  description: string;
  pin: string; // Add pin to the Restaurant interface
  pinExpiration: string; // Add pinExpiration to the Restaurant interface
}

export default function Page() {
  const { toast } = useToast();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false); // State for PIN dialog
  const [pin, setPin] = useState(""); // State for PIN input
  const [showEmojiDialog, setShowEmojiDialog] = useState(false);
  const [comment, setComment] = useState(""); // State for emoji dialog
  const limit = 20;

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const res = await fetch(`/api/restaurants?page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch restaurants");
        const data = await res.json();
        setRestaurants(data.restaurants);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    }
    fetchRestaurants();
  }, [page]);

  const handlePinSubmit = async () => {
    if (!selectedRestaurant) return;

    try {
      // Verify the PIN
      const res = await fetch(`/api/restaurants/${selectedRestaurant.id}/verify-pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      if (!res.ok) throw new Error("Invalid PIN");

      // If PIN is valid, show the emoji dialog
      setShowPinDialog(false);
      setShowEmojiDialog(true);
    } catch (error) {
      toast({
        title: "Invalid PIN",
        description: "The PIN you entered is incorrect or has expired.",
        variant: "destructive",
      });
    }
  };

  const handleEmojiSelect = async (emoji: string) => {
    if (!selectedRestaurant || isSubmitting) return;
    setIsSubmitting(true);

    const emojiRatings: Record<string, number> = {
      "🤬": 1, "😡": 1, "👎": 1,         // Very bad experience
      "😞": 2, "😢": 2, "🙁": 2,         // Bad experience
      "😐": 3, "🤷": 3, "😕": 3,         // Neutral experience
      "🙂": 4, "😀": 4, "🤗": 4,         // Good experience
      "😍": 5, "😊": 5, "😃": 5, "👍": 5, "🥰": 5 // Excellent experience
    };

    try {
      const sessionRes = await fetch("/api/auth/check-session", { credentials: "include" });
      if (!sessionRes.ok) throw new Error("Failed to fetch session");
      const sessionData = await sessionRes.json();
      if (!sessionData?.user.user_id) throw new Error("User not logged in");

      const feedbackRes = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: sessionData.user_id,
          restaurant_id: selectedRestaurant.id,
          emoji,
          rating: emojiRatings[emoji],
          comment,
        }),
        credentials: "include",
      });

      if (!feedbackRes.ok) throw new Error("Failed to submit feedback");

      toast({
        title: "Thank you for your feedback!",
        description: `You rated ${selectedRestaurant.name} with ${emoji}.`,
      });

      setSelectedRestaurant(null);
      setShowEmojiDialog(false);
      setComment(""); // Reset comment field
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Something went wrong!",
        description: "Could not submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <BreadcrumbPage>Restaurants to Rate</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {restaurants.map((restaurant) => (
                <Card key={restaurant.id} className="shadow-lg">
                  <CardHeader>
                    <CardTitle>{restaurant.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{restaurant.description}</p>
                    <Button
                      className="mt-2 w-full"
                      onClick={() => {
                        setSelectedRestaurant(restaurant);
                        setShowPinDialog(true); // Show PIN dialog first
                      }}
                    >
                      Rate Experience
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
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

      {/* PIN Verification Dialog */}
      <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <DialogContent className="p-6">
          <h3 className="text-lg font-semibold text-center">Enter PIN</h3>
          <Input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="mt-4"
          />
          <Button className="mt-4 w-full" onClick={handlePinSubmit}>
            Submit
          </Button>
        </DialogContent>
      </Dialog>

      {/* Emoji Rating Dialog */}
      <Dialog open={showEmojiDialog} onOpenChange={setShowEmojiDialog}>
        <DialogContent className="p-6">
          <h3 className="text-lg font-semibold text-center">Rate {selectedRestaurant?.name}</h3>
          <div className="grid grid-cols-5 gap-2 mt-4 justify-center overflow-auto max-h-60">
            {emojis.map((emoji) => (
              <Button
                key={emoji}
                className="text-4xl p-3 w-16 h-16 flex items-center justify-center"
                variant="ghost"
                onClick={() => handleEmojiSelect(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
          <Textarea
            placeholder="Leave a comment (optional)"
            className="mt-4 w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}