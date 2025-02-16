import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserFromSession } from "@/lib/session";

// Emoji to rating mapping
const emojiToRating: { [key: string]: number } = {
    "🤬": 1,
    "😞": 2,
    "😐": 3,
    "🙂": 4,
    "😍": 5,
};

export async function POST(req: NextRequest) {
    try {
        let { user_id, restaurant_id, emoji } = await req.json();
        console.log("Received request with data:", { user_id, restaurant_id, emoji });

        // Get session data
        const sessionResponse = await getUserFromSession();
        const user = Array.isArray(sessionResponse) ? sessionResponse[0] : sessionResponse; // Ensure correct access

        // If user_id is missing, retrieve from session
        if (!user_id) {
            console.log("Session user:", user);

            if (!user || !user.user_id) {
                console.error("Unauthorized request: No user ID");
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            user_id = user.user_id; // Assign correct user_id
        }

        // Validate emoji
        if (!emojiToRating[emoji]) {
            console.error("Invalid emoji received:", emoji);
            return NextResponse.json({ error: "Invalid emoji" }, { status: 400 });
        }

        const rating = emojiToRating[emoji];

        // Insert restaurant rating into feedback table
        console.log("Inserting feedback into database...");
        await db.query(
            "INSERT INTO feedback (user_id, restaurant_id, emoji, rating) VALUES (?, ?, ?, ?)",
            [user_id, restaurant_id, emoji, rating]
        );

        // Update restaurant average rating and total ratings
        console.log("Updating restaurant ratings...");
        await db.query(
            `UPDATE restaurants
            SET avg_rating = (SELECT AVG(rating) FROM feedback WHERE restaurant_id = ?),
                total_ratings = (SELECT COUNT(rating) FROM feedback WHERE restaurant_id = ?)
            WHERE id = ?`,
            [restaurant_id, restaurant_id, restaurant_id]
        );

        console.log("Feedback submitted successfully");
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
