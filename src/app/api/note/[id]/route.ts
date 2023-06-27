import { authOptions } from "@/app/lib/auth";
import { productAddNote } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, param: { params: { id: string } }) {
  try {
    const { textValue } = await req.json();

    const id = param.params.id;

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ meesage: "로그인을 해주세요." });
    }

    const fromUser = session.user.name;

    const result = await productAddNote(id, textValue, fromUser);

    if (result) {
      return NextResponse.json({ message: "성공" });
    }

    return NextResponse.json({ message: "실패" });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
