import { deleteMyWishList } from "@/app/_lib/db";
import { myGetServerSession } from "@/app/_lib/getSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ids } = await req.json();

    const session = await myGetServerSession();

    const { email, name } = session.user;

    const response = await deleteMyWishList(ids, email, name);

    return NextResponse.json({ response, status: 201 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
