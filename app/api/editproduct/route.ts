import { authOptions } from "@/app/lib/auth";
import {
  MongoDbAddProducts,
  MongoDbEditProducts,
} from "@/app/lib/editProducts";
import { ProductsType } from "@/type/type";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("로그인 정보가 없습니다.");
    }

    const data: ProductsType = await req.json();

    const dbResponse = await MongoDbAddProducts(data);

    if (dbResponse.status !== 201) {
      throw new Error("등록실패");
    }

    return NextResponse.json({ message: "등록 성공" }, { status: 200 });
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
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("로그인 정보가 없습니다.");
    }

    const data: ProductsType = await req.json();
    const { email, name } = session.user;

    const dbResponse = await MongoDbEditProducts(data, email, name);

    if (dbResponse.status !== 200) {
      throw new Error("수정 실패");
    }

    return NextResponse.json({ message: "수정 성공" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
