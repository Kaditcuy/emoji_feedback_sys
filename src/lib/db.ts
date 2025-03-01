import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();  // Load environment variables

const dbUrl = new URL(process.env.DATABASE_URL || "");

// Parse DATABASE_URL
export const db = mysql.createPool({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1), // Remove leading "/"
  port: parseInt(dbUrl.port || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Database connection successful");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
})();
