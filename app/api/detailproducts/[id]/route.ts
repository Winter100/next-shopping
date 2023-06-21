import { checkMyWishList, getDetailProduct } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { email } = await req.json();
    const id = params.id;

    if (email === "") {
      const findProduct = await getDetailProduct(id);

      return NextResponse.json({ detailData: findProduct, iswish: false });
    } else {
      const findProduct = await getDetailProduct(id);
      const iswish = await checkMyWishList(email, id);

      return NextResponse.json({ detailData: findProduct, iswish: iswish });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
