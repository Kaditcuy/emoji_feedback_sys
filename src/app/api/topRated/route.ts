import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust import based on your DB setup

export async function GET(req: NextRequest) {
    try {
        // Extract query parameters
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10; // Default: Show top 10
        const offset = (page - 1) * limit;

        // Fetch top-rated restaurants
        const [restaurants] = await db.query(
            `SELECT 
                id, 
                name, 
                location, 
                avg_rating, 
                total_ratings
            FROM restaurants
            WHERE total_ratings > 0
            ORDER BY avg_rating DESC, total_ratings DESC
            LIMIT ? OFFSET ?;`,
            [limit, offset]
        );

        // Get total number of rated restaurants
        const [[{ total }]] = await db.query(
            `SELECT COUNT(*) AS total FROM restaurants WHERE total_ratings > 0;`
        );

        return NextResponse.json({
            restaurants,
            total
        });
    } catch (error) {
        console.error("Error fetching top-rated restaurants:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
