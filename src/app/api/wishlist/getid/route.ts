import { authOptions } from "@/app/lib/auth";
import { getMywishListId } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const email = session?.user?.email;

    if (!email || !session) {
      return NextResponse.json([]);
    }

    const findProduct = await getMywishListId(email);

    return NextResponse.json(findProduct);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
