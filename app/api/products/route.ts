import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";

export async function GET() {
  const result = await pool.query(
    "SELECT * FROM products ORDER BY created_at DESC"
  );
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  try {
    const { name, category, price, stock } = await req.json();

    await pool.query(
      `INSERT INTO products (name, category, price, stock)
       VALUES ($1, $2, $3, $4)`,
      [name, category, price, stock]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
