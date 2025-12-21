// /api/products/route.js
import { getConnection } from '../../../lib/db';

// -----------------------
// GET all products
// -----------------------
export async function GET() {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM products');
  await connection.end();

  // Map MySQL rows to proper frontend object
  const items = rows.map(row => ({
    id: row.id,
    name: row.name,
    category: row.category || '', // 直接返回字符串，不用 JSON.parse
    src: row.src,
    price: row.price,
    priceNum: row.priceNum,
    serialNum: row.serialNum,
    Typ: row.Typ,
    Hersteller: row.Hersteller,
    Bauform: row.Bauform,
    Nennweite: row.Nennweite,
    Anschluss: row.Anschluss,
    Anschlussart: row.Anschlussart,
    Bauart: row.Bauart,
    KVWert: row.KVWert,
    Schaltfunktion: row.Schaltfunktion,
    Steuerung: row.Steuerung,
    Material: row.Material,
    Dichtung: row.Dichtung,
    Spannung: row.Spannung,
    Spannungstoleranz: row.Spannungstoleranz,
    Leistungsaufnahme: row.Leistungsaufnahme,
    Einschaltdauer: row.Einschaltdauer,
    Schutzart: row.Schutzart,
    Medium: row.Medium,
    TemperaturMedium: row.TemperaturMedium,
    TemperaturUmgebung: row.TemperaturUmgebung,
    MaximalerDruck: row.MaximalerDruck,
    Einbaulage: row.Einbaulage
  }));

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// -----------------------
// POST - Add new product
// -----------------------
export async function POST(req) {
  const data = await req.json();
  const connection = await getConnection();

  // Insert into MySQL; id is auto-increment
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(',');

  const sql = `INSERT INTO products (${keys.join(',')}) VALUES (${placeholders})`;
  const [result] = await connection.execute(sql, values);

  // Return the newly inserted row with generated id
  const [rows] = await connection.execute('SELECT * FROM products WHERE id = ?', [result.insertId]);
  await connection.end();

  return new Response(JSON.stringify(rows[0]), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// -----------------------
// PUT - Update existing product
// -----------------------


export async function PUT(req) {
  const { id, ...data } = await req.json(); // id 用于 WHERE

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 只更新非空字段
  const keys = Object.keys(data);
  const values = Object.values(data);

  const sql = `UPDATE products SET ${keys.map(k => `${k}=?`).join(',')} WHERE id=?`;

  const connection = await getConnection();
  try {
    const [result] = await connection.execute(sql, [...values, id]);
    await connection.end();

    return new Response(JSON.stringify({ success: true, affectedRows: result.affectedRows }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    await connection.end();
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}



// -----------------------
// DELETE - Delete product by id
// -----------------------
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400 });
  }

  const connection = await getConnection();
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  await connection.end();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

/*import { getConnection } from "../../../lib/db";

export async function GET() {
  const connection = await getConnection();
  const [rows] = await connection.execute("SELECT * FROM products");
  await connection.end();

  const items = rows.map(row => ({
    name: row.name,
    category: JSON.parse(row.category || "[]"),
    src: row.src,
    price: row.price,
    priceNum: row.priceNum,
    serialNum: row.serialNum,
    Typ: row.Typ,
    Hersteller: row.Hersteller,
    Bauform: row.Bauform,
    Nennweite: row.Nennweite,
    Anschluss: row.Anschluss,
    Anschlussart: row.Anschlussart,
    Bauart: row.Bauart,
    KVWert: row.KVWert,
    Schaltfunktion: row.Schaltfunktion,
    Steuerung: row.Steuerung,
    Material: row.Material,
    Dichtung: row.Dichtung,
    Spannung: row.Spannung,
    Spannungstoleranz: row.Spannungstoleranz,
    Leistungsaufnahme: row.Leistungsaufnahme,
    Einschaltdauer: row.Einschaltdauer,
    Schutzart: row.Schutzart,
    Medium: row.Medium,
    TemperaturMedium: row.TemperaturMedium,
    TemperaturUmgebung: row.TemperaturUmgebung,
    MaximalerDruck: row.MaximalerDruck,
    Einbaulage: row.Einbaulage,
  }));

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
  });
}
*/