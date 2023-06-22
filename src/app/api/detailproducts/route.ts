import { NextResponse } from "next/server";
import { getDetailProduct } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const { detailId } = await req.json();

    const findProduct = await getDetailProduct(detailId);

    return NextResponse.json(findProduct);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
