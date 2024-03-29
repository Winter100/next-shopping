import { authOptions } from "@/app/_lib/auth";
import { getMywishListId } from "@/app/_lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
