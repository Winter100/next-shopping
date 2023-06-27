import { authOptions } from "@/app/lib/auth";
import { getProductMessage } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, param: { params: { id: string } }) {
  try {
    const id = param.params.id;

    // const session = await getServerSession(authOptions);

    // if (!session) {
    //   return NextResponse.json({ meesage: "로그인을 해주세요." });
    // }

    const findMessage = await getProductMessage(id);

    return NextResponse.json(findMessage);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
