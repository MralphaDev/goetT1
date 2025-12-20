/*import mysql from "mysql2/promise";

export async function getConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",     // or your MySQL host
    user: "root",          // your DB user
    password: "Visonwzx1234@",  // your DB password
    database: "goetgmbh",      // your DB name
  });
  return connection;
}*/
import mysql from "mysql2/promise";

export async function getConnection() {
  const connection = await mysql.createConnection({
    host: "srv2067.hstgr.io",           // 线上数据库地址
    user: "u550705974_goet",         // 数据库用户
    password: "Visonwzx1234@",           // 这个用户的密码
    database: "u550705974_goetvalves", // 数据库名
  });
  return connection;
}
