import { getConnection } from "@/src/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, cart} = body;

    const conn = await getConnection();
    await conn.execute(
      "INSERT INTO user_purchase (email, name, cart) VALUES (?, ?, ?)",
      [email, name, cart] // store total separately if you have a column
    );
    await conn.end();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message+"why error" }), { status: 500 });
  }
}
