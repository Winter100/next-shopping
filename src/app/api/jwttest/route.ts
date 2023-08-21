import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    const session = await getSession();

    console.log(token);
    console.log("session", session);

    return NextResponse.json({ message: "성공" });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
