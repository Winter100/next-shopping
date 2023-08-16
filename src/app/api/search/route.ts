import { getAllProducts } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const searchKeyword = params?.slug[0];
    const searchPage = Number(params?.slug[1]);

    const url = new URL(req.url);
    console.log(url.href);
    const a = url.searchParams.get("keyword");
    const b = url.searchParams.get("page");

    console.log(a, b);
    const allData = await getAllProducts(searchKeyword, searchPage);
    return NextResponse.json(allData);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
