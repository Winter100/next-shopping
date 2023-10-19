import { getAllProducts } from "@/app/_lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const searchKeyword = String(params?.slug[0]);
    const searchPage = Number(params?.slug[1]);
    const filterValue = params?.slug[2];

    const allData = await getAllProducts(
      searchKeyword,
      searchPage,
      filterValue
    );
    return NextResponse.json(allData);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
