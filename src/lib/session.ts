/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import crypto from "crypto";

// Generate a random session token
const generateSessionToken = () => crypto.randomBytes(32).toString("hex");

// Set cookie options
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

// Create session and set cookie
export async function createSession(userId: number) {
  const cookieStore = await cookies(); // No need to await this

  // Check for existing session
  const [existingSession]: any = await db.query(
    "SELECT session_token FROM sessions WHERE user_id = ? AND expires_at > NOW() LIMIT 1",
    [userId]
  );

  let sessionToken;
  
  if (existingSession.length) {
    // Reuse existing session
    sessionToken = existingSession[0].session_token;
  } else {
    // Create new session token
    sessionToken = generateSessionToken();

    // Store session in database
    try {
      await db.query(
        "INSERT INTO sessions (user_id, session_token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 DAY))",
        [userId, sessionToken]
      );
      console.log("Session created successfully");
    } catch (error) {
      console.error("Session INSERT failed:", error);
      return null;
    }
  }

  // Store the session token in the cookie (AWAIT here)
  await cookieStore.set("session_token", sessionToken, COOKIE_OPTIONS);
  console.log("Session token set in cookie");

  return sessionToken; // Return the session token for debugging
}

// Get user from session token
export async function getUserFromSession(): Promise<{ user: { user_id: number; email: string } } | null> {
  const cookieStore = await cookies(); // Remove `await`
  const sessionToken = cookieStore.get("session_token")?.value;
  
  if (!sessionToken) return null;

  const [rows]: any = await db.query(
    `SELECT users.id AS user_id, users.email 
     FROM users 
     JOIN sessions ON users.id = sessions.user_id 
     WHERE sessions.session_token = ? 
     AND sessions.expires_at > NOW()`, 
    [sessionToken]
  );

  console.log("Session query result:", rows);

  return rows.length ? { user: { user_id: rows[0].user_id, email: rows[0].email } } : null;
}

// Logout: Delete session and clear cookie
export async function destroySession() {
  const cookieStore = await cookies(); // No need to await
  const sessionToken = cookieStore.get("session_token")?.value;

  if (!sessionToken) return;

  // Remove session from database
  await db.query("DELETE FROM sessions WHERE session_token = ?", [sessionToken]);

  // Clear cookie (AWAIT here)
  await cookieStore.set("session_token", "", { ...COOKIE_OPTIONS, maxAge: 0 });
}
 