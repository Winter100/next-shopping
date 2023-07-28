import { getAllProducts } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { pagenumber: number } }
) {
  try {
    const page = params.pagenumber;

    const allProducts = await getAllProducts(page);

    return NextResponse.json(allProducts);
  } catch (e) {
    if (e instanceof Error) {
      console.log({ message: e.message }, { status: 500 });
      return NextResponse.json([]);
    } else {
      console.log({ message: String(e) });
      return NextResponse.json([]);
    }
  }
}
