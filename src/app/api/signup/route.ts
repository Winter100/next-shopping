import { NextResponse } from "next/server";
import { MongoDbSignUp } from "../../lib/signUp";
import { User } from "../../type/type";
import { checkEmail } from "@/app/lib/db";

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

export async function PATCH(req: Request) {
  try {
    const { email } = await req.json();

    const dbResponse = await checkEmail(email);

    if (dbResponse) {
      throw new Error("중복된 메일입니다.");
    }

    return NextResponse.json(false);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
