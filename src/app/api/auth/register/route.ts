import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession } from "@/lib/session"; // Assuming session management exists

export async function POST(req: Request) {
  try {
    const { email, fname, password } = await req.json();

    // ✅ Validate that all fields are provided
    if (!email || !fname || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }

    // Check if the user already exists
    const [existingUsers]: any = await db.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, fname]);

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database. [result] because db.query() returns an array
    const [result]: any = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [fname, email, hashedPassword]
    );

    // ✅ Ensure user ID retrieval
    const userId = result.insertId; // Since 'id' is auto-incremented

    if (!userId) {
      console.error("Error: Failed to retrieve user ID. Insert result:", result);
      return NextResponse.json({ error: "Failed to retrieve user ID" }, { status: 500 });
    }

    // Create a session for the new user
    await createSession(userId);

    return NextResponse.json({ message: "Signup successful" }, { status: 201 });
    return NextResponse.redirect("/dashboard");
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
