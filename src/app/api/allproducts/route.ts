import { getAllProducts } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allProducts = await getAllProducts();

    return NextResponse.json(allProducts);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
