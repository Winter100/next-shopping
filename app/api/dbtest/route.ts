import { authOptions } from "@/app/lib/auth";
import { connectDatabase } from "@/app/lib/db";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({ message: "123" });
}

export async function POST(req: Request) {
  const { id } = await req.json();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "로그인 필요" });
  }

  const client = await connectDatabase();

  const db = client.db();

  const data = await db.collection("Shopping-All-Products").find().toArray();

  return NextResponse.json({ message: id, gg: data });
}
