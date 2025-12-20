import { getConnection } from "../../../lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, cart, orderNumber } = body;
    const createdAt = new Date(); // 当前时间

    const conn = await getConnection();
    await conn.execute(
      "INSERT INTO user_purchase (email, name, cart, orderNumber, created_at) VALUES (?, ?, ?, ?, ?)",
      [email, name, JSON.stringify(cart), orderNumber, createdAt]
    );
    await conn.end();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
