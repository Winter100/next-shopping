import { addMyWishList } from "@/src/app/lib/db";
import { myGetServerSession } from "@/src/app/lib/getSession";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const session = await myGetServerSession();

    const { email, name } = session.user;

    const response = await addMyWishList(email, name, id);
    return NextResponse.json({ response });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
