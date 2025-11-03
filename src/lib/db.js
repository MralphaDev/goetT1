import mysql from "mysql2/promise";

export async function getConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",     // or your MySQL host
    user: "root",          // your DB user
    password: "Visonwzx1234@",  // your DB password
    database: "goetgmbh",      // your DB name
  });
  return connection;
}
