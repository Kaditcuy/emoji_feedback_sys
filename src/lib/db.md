import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();  // Load environment variables

// Create MySQL Connection Pool
export const db = mysql.createPool({
  host: process.env.DB_HOST,       // Your database host
  user: process.env.DB_USER,       // Your database user
  password: process.env.DB_PASS,   // Your database password
  database: process.env.DB_NAME,   // Your database name
  waitForConnections: true,
  connectionLimit: 10,             // Adjust as needed
  queueLimit: 0,
});

// Test the database connection asynchronously
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Database connection successful");
    connection.release();  // Always release the connection back to the pool
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
})();
