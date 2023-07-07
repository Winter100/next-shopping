import { checkMyWishList, getDetailProduct } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // const { email = "" } = await req.json();
    const id = params.id;

    // let iswish = false;
    const findProduct = await getDetailProduct(id);

    // if (email) {
    //   iswish = await checkMyWishList(email, id);
    // }

    return NextResponse.json({ detailData: findProduct });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
