import { getDetailProduct } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const id = await req.json();

    const findProduct = await getDetailProduct(id);

    return NextResponse.json(findProduct);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}