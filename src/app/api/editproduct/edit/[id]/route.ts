import { authOptions } from "@/app/lib/auth";
import {
  MongoDbAddProducts,
  MongoDbEditProducts,
} from "@/app/lib/editProducts";
import { ProductsType } from "@/app/type/type";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

//상품 등록
export async function POST(req: NextRequest) {
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
      return NextResponse.json({ message: e.message }, { status: 201 });
    } else {
      return NextResponse.json({ message: String(e) }, { status: 201 });
    }
  }
}

//상품 수정
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
