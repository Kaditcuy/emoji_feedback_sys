import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 8;
  const offset = (page - 1) * limit;

  try {
    // Fetch paginated restaurants
    const [restaurants]: any = await db.query(
      "SELECT id, name, description, location FROM restaurants LIMIT ? OFFSET ?",
      [limit, offset]
    );

    // Get total count for pagination
    const [[{ total }]]: any = await db.query("SELECT COUNT(*) as total FROM restaurants");

    return NextResponse.json({ restaurants, total, page, limit });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
