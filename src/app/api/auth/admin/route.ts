import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession } from "@/lib/session"; // Assuming you have session management

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Query database for the user
    const [users]: any = await db.query("SELECT * FROM admin WHERE email = ?", [email]);

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = users[0];

    // Compare password hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create session and set cookie (assuming setSession function exists)
    await createSession(user.id);

    return NextResponse.json({ message: "Login successful" });
    return NextResponse.redirect("/dashboard/admin");
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
