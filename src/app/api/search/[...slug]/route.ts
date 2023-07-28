import { getAllProducts, getSearchProducts } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const searchValue = params.slug[0];
    const searchPage = Number(params.slug[1]);

    if (searchValue === "all") {
      const allData = await getAllProducts(searchPage);
      return NextResponse.json(allData);
    } else {
      const searchData = await getSearchProducts(searchValue, searchPage);
      return NextResponse.json(searchData);
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
