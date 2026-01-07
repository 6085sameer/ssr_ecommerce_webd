import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";

type Params = {
  params: { id: string };
};

export async function PUT(req: Request, { params }: Params) {
  try {
    const { name, category, price, stock } = await req.json();
    const id = params.id;

    await pool.query(
      `UPDATE products
       SET name=$1, category=$2, price=$3, stock=$4
       WHERE id=$5`,
      [name, category, price, stock, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const id = params.id;

    await pool.query("DELETE FROM products WHERE id=$1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
