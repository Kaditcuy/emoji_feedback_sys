import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    // Extract `id` from the URL path
    const pathSegments = req.nextUrl.pathname.split("/");
    const id = pathSegments[pathSegments.length - 2]; // Get the second-to-last segment

    console.log("Extracted ID from URL:", id); // Debugging log

    if (!id) {
      return NextResponse.json({ message: "Missing restaurant ID" }, { status: 400 });
    }

    const { pin } = await req.json();
    if (!pin) {
      return NextResponse.json({ message: "Missing PIN" }, { status: 400 });
    }

    console.log("Received PIN from request:", pin); // Debugging log

    // Fetch the restaurant's PIN and expiration
    const result: any = await db.query(
      "SELECT pin, pin_expiration FROM restaurants WHERE id = ?",
      [id]
    );

    console.log("Full query result:", result); // Debugging log

    // Extract the first row of the first result set
    const restaurant = result[0]?.[0]; // Ensure safe array access

    console.log("Extracted restaurant data:", restaurant); // Debugging log

    if (!restaurant) {
      return NextResponse.json({ message: "Restaurant not found" }, { status: 404 });
    }

    console.log("Stored PIN in DB:", restaurant.pin || "undefined"); // Debugging log

    if (!restaurant.pin_expiration) {
      return NextResponse.json({ message: "PIN expiration missing" }, { status: 500 });
    }

    const pinExpiration = new Date(restaurant.pin_expiration);
    if (isNaN(pinExpiration.getTime())) {
      return NextResponse.json({ message: "Invalid PIN expiration date" }, { status: 500 });
    }

    console.log("PIN Expiration (UTC):", pinExpiration.toISOString()); // Debugging log

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