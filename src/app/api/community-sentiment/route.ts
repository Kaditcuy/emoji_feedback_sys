/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Ensure correct path to your database utility

const emojiSentimentMap: { [key: string]: "positive" | "neutral" | "negative" } = {
  "😊": "positive", "😃": "positive", "😀": "positive", "😍": "positive", 
  "👍": "positive", "🥰": "positive", "🤗": "positive", 
  "😐": "neutral", "🤷": "neutral", "😕": "neutral",
  "😞": "negative", "😡": "negative", "🤬": "negative", 
  "😢": "negative", "👎": "negative", "🙁": "negative"
};

export async function GET(req: NextRequest) {
    try {
      // Fetch feedback along with restaurant names
      const [rows]: any = await db.query(`
        SELECT f.restaurant_id, r.name AS restaurant_name, f.emoji 
        FROM feedback f
        JOIN restaurants r ON f.restaurant_id = r.id
        ORDER BY f.created_at DESC;
      `);
      
  
      if (!Array.isArray(rows) || rows.length === 0) {
        return NextResponse.json({
          message: "No feedback available yet.",
          restaurants: [],
        });
      }
  
      // Process feedback and calculate sentiment per restaurant
      const restaurantSentiments: { 
        [key: string]: { restaurant_name: string, sentiment: { positive: number, neutral: number, negative: number }, totalFeedback: number } 
      } = {};
  
      rows.forEach(({ restaurant_id, restaurant_name, emoji }: { restaurant_id: string, restaurant_name: string, emoji: string }) => {
        if (!restaurantSentiments[restaurant_id]) {
          restaurantSentiments[restaurant_id] = { 
            restaurant_name, // Use restaurant_name here
            sentiment: { positive: 0, neutral: 0, negative: 0 }, 
            totalFeedback: 0 
          };
        }
        const sentiment = emojiSentimentMap[emoji] || "neutral";
        restaurantSentiments[restaurant_id].sentiment[sentiment]++;
        restaurantSentiments[restaurant_id].totalFeedback++;
      });
  
      // Convert object to array for easier frontend rendering
      const restaurantSentimentArray = Object.values(restaurantSentiments);
  
      return NextResponse.json({
        restaurants: restaurantSentimentArray,
      });
    } catch (error) {
      console.error("Error fetching restaurant sentiment:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
/* eslint-disable @typescript-eslint/no-explicit-any */