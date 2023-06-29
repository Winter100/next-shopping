import { authOptions } from "@/app/lib/auth";
import { soldOutProduct } from "@/app/lib/db";
import { MongoDbDeleteProducts } from "@/app/lib/editProducts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//등록 상품 삭제
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const id = params.id;

    if (!session) {
      throw new Error("로그인 정보가 없습니다.");
    }
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

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const id = params.id;

    if (!session) {
      throw new Error("로그인 정보가 없습니다.");
    }
    const { email, name } = session.user;

    const dbResponse = await soldOutProduct(id, email, name);

    if (dbResponse.status !== 200) {
      throw new Error("수정 실패");
    }

    return NextResponse.json({ message: "판매완료처리" }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
