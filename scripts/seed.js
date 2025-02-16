import { faker } from "@faker-js/faker";
import mysql from "mysql2/promise";

async function generateRestaurants(count = 50) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST, // or your database host
    user: process.env.DB_USER, // your database user
    password: process.env.DB_PASS, // your database password
    database: process.env.DB_NAME, // update with your database
  });

  for (let i = 0; i < count; i++) {
    const name = faker.company.name();
    const description = faker.lorem.sentence();
    const location = `${faker.address.city()}, ${faker.address.stateAbbr()}`;

    await db.execute(
      "INSERT INTO restaurants (name, description, location) VALUES (?, ?, ?)",
      [name, description, location]
    );
  }

  console.log("✅ Mock data inserted!");
  await db.end();
}

generateRestaurants();
