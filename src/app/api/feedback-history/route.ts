/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/session";
import { db } from "@/lib/db"; // Adjust import based on your DB setup

export async function GET(req: NextRequest) {
    try {
        // Get session data
        const sessionResponse = await getUserFromSession();
        const user = Array.isArray(sessionResponse) ? sessionResponse[0] : sessionResponse; // Ensure correct access

        if (!user || !user.user_id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user_id = user.user_id;

        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 20;
        const offset = (page - 1) * limit;

        // Fetch feedback history
        const [feedback] = await db.query(
            `SELECT f.id, r.name AS name, f.emoji, f.rating, 
                    DATE_FORMAT(f.created_at, '%Y-%m-%d %H:%i:%s') AS created_at
            FROM feedback f
            JOIN restaurants r ON f.restaurant_id = r.id
            WHERE f.user_id = ?
            ORDER BY f.created_at DESC
            LIMIT ? OFFSET ?;`,
            [user_id, limit, offset]
        ) as [{ id: number; name: string; emoji: string; rating: number | null; created_at: string }[], any];

        // Get total feedback count
        const [totalResult] = await db.query(
            `SELECT COUNT(*) AS total FROM feedback WHERE user_id = ?`,
            [user_id]
        ) as [{ total: number }[], any];

        const total = totalResult.length ? totalResult[0].total : 0;

        return NextResponse.json({
            feedback: feedback.map(f => ({
                id: f.id,
                restaurant_name: f.name || "Unknown",
                emoji: f.emoji || "😶",  // Default emoji if null
                rating: f.rating !== null ? f.rating : "N/A",
                created_at: f.created_at || "Invalid Date"
            })),
            total
        });
    } catch (error) {
        console.error("Error fetching feedback history:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
} 
