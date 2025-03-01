/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = await context;
    const id = params.id;

    if (!id) {
      return NextResponse.json({ message: "Missing restaurant ID" }, { status: 400 });
    }

    const { pin } = await req.json();
    if (!pin) {
      return NextResponse.json({ message: "Missing PIN" }, { status: 400 });
    }

    // Fetch the restaurant's PIN and expiration
    const result: any = await db.query(
      "SELECT pin, pin_expiration FROM restaurants WHERE id = ?",
      [id]
    );

    // Debugging: Log the full query result
    console.log("Full query result:", result);

    // Access the first row of the result
    const restaurant = result[0][0]; // Adjust based on the actual structure

    // Debugging logs
    console.log("Fetched restaurant data:", restaurant);
    if (!restaurant) {
      return NextResponse.json({ message: "Restaurant not found" }, { status: 404 });
    }

    console.log("Received PIN from request:", pin);
    console.log("Stored PIN in DB:", restaurant.pin || "undefined");

    if (!restaurant.pin_expiration) {
      return NextResponse.json({ message: "PIN expiration missing" }, { status: 500 });
    }

    console.log("Current Time (UTC):", new Date().toISOString());

    const pinExpiration = new Date(restaurant.pin_expiration);
    if (isNaN(pinExpiration.getTime())) {
      return NextResponse.json({ message: "Invalid PIN expiration date" }, { status: 500 });
    }

    console.log("PIN Expiration (UTC):", pinExpiration.toISOString());

    // Ensure PIN comparison works and check expiration
    const currentTime = new Date();
    if (String(restaurant.pin) !== String(pin) || currentTime > pinExpiration) {
      return NextResponse.json({ message: "Invalid PIN or PIN expired" }, { status: 401 });
    }

    return NextResponse.json({ message: "PIN verified" }, { status: 200 });
  } catch (error) {
    console.error("Error verifying PIN:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
 