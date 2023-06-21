import { deleteMyWishList } from "@/app/lib/db";
import { myGetServerSession } from "@/app/lib/getSession";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
