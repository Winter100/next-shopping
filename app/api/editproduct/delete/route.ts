import { authOptions } from "@/app/lib/auth";
import { MongoDbDeleteProducts } from "@/app/lib/editProducts";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("로그인 정보가 없습니다.");
    }

    const id: string = await req.json();
    console.log("id", id);
    const { email, name } = session.user;

    const dbResponse = await MongoDbDeleteProducts(id, email, name);

    if (dbResponse.status !== 200) {
      throw new Error("수정 실패");
    }

    return NextResponse.json({ message: "삭제 성공" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
