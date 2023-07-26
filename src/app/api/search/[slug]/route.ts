import { NextResponse } from "next/server";

//상품 등록
export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const searchValue = params.slug;

    return NextResponse.json({});
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
