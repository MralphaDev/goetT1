// app/api/purchases/route.js
import { NextResponse } from "next/server";
import { getConnection } from "@/src/lib/db";

export async function GET() {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query("SELECT name, email, cart, DATE(created_at) as date FROM user_purchase");
    const data = rows.map((r) => ({ ...r, cart: JSON.parse(r.cart) }));
    await conn.end();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
