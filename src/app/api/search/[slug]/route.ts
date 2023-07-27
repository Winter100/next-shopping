import { getSearchProducts } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const searchValue = params.slug;

    const searchData = await getSearchProducts(searchValue);

    return NextResponse.json(searchData);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
