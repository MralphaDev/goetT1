import { getConnection } from "../../../lib/db";

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
