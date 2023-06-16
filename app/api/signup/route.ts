import { MongoDbSignUp } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data: User = await req.json();

    const dbResponse = await MongoDbSignUp(data);

    if (dbResponse.status !== 201) {
      throw new Error(dbResponse.message);
    }

    return NextResponse.json({ message: "가입 성공", status: 201 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
