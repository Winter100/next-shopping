import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(params: Request) {
  const { textValue } = await params.json();

  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ meesage: "로그인을 해주세요." });
  }

  console.log("textValue", textValue);

  return NextResponse.json({ message: "확인중" });
}
