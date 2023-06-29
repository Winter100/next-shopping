import { getAllProducts } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { pagenumber: number } }
) {
  try {
    const page = params.pagenumber;

    const allProducts = await getAllProducts(page);

    return NextResponse.json(allProducts);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
