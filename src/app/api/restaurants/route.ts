/* eslint-disable @typescript-eslint/no-explicit-any */
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

export async function POST(request: Request) {
  try {
    const { name, description, location } = await request.json();

    if (!name || !description || !location) {
      return NextResponse.json(
        { error: "Name, description, and location are required" },
        { status: 400 }
      );
    }

    // Generate a unique 4-digit PIN
    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    // Set expiration to 2 days from now
    const pinExpiration = new Date();
    pinExpiration.setDate(pinExpiration.getDate() + 2);

    // Insert the new restaurant into the database
    const [result]: any = await db.query(
      "INSERT INTO restaurants (name, description, location, pin, pin_expiration) VALUES (?, ?, ?, ?, ?)",
      [name, description, location, pin, pinExpiration]
    );

    return NextResponse.json(
      {
        id: result.insertId,
        name,
        description,
        location,
        pin,
        pinExpiration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding restaurant:", error);
    return NextResponse.json(
      { error: "Failed to add restaurant" },
      { status: 500 }
    );
  }
}
 