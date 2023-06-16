import { MongoDbAddProducts } from "@/app/lib/editProducts";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export interface AddProductsType {
  title: string;
  description: string;
  price: number;
  selectedValue: {
    random: string;
    isMeet: string;
    bargaining: string;
  };
  imageSrc: string;
  email: string | null | undefined;
  name: string | null | undefined;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("로그인 정보가 없습니다.");
    }

    const data: AddProductsType = await req.json();

    const dbResponse = await MongoDbAddProducts(data);

    if (dbResponse.status !== 201) {
      throw new Error("등록실패");
    }

    return NextResponse.json({ message: "등록 성공" }, { status: 201 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}

export async function PATCH(req: Request) {}

export async function DELETE(req: Request) {}
