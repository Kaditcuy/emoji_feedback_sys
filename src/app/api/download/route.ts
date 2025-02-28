import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserFromSession } from "@/lib/session";

export async function GET(req: NextRequest) {
    try {
        // Get session data
        const sessionResponse = await getUserFromSession();
        const user = Array.isArray(sessionResponse) ? sessionResponse[0] : sessionResponse; // Ensure correct access

        if (!user || !user.user_id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user_id = user.user_id;

        // Fetch user profile details
        const [profileResult] = await db.query(
            "SELECT id, email, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at FROM users WHERE id = ?",
            [user_id]
        ) as [{ id: number; email: string; created_at: string }[], any];

        const profile = profileResult.length ? profileResult[0] : null;

        // Fetch user feedback history
        const [feedbackResult] = await db.query(
            `SELECT f.restaurant_id, r.name AS restaurant_name, f.emoji, 
                    DATE_FORMAT(f.created_at, '%Y-%m-%d %H:%i:%s') AS created_at 
            FROM feedback f 
            JOIN restaurants r ON f.restaurant_id = r.id 
            WHERE f.user_id = ? 
            ORDER BY f.created_at DESC;`,
            [user_id]
        ) as [{ restaurant_id: number; restaurant_name: string; emoji: string; created_at: string }[], any];

        return NextResponse.json({
            profile,
            feedback: feedbackResult.map(f => ({
                restaurant_id: f.restaurant_id,
                restaurant_name: f.restaurant_name || "Unknown",
                emoji: f.emoji || "😶",  // Default emoji if null
                created_at: f.created_at || "Invalid Date"
            }))
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
