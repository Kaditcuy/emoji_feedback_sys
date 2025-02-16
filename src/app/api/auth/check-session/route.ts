import { getUserFromSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserFromSession();
  if (!user) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }
  console.log("Session API response:", user);
  return NextResponse.json({ user });
}
