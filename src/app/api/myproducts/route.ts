import { NextRequest, NextResponse } from "next/server";
import { getMyProducts } from "../../_lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    const response = await getMyProducts(email, name);

    return NextResponse.json(response);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
