import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { PasswordType, authOptions, changePassword } from "../../_lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const data: PasswordType = await req.json();

    if (!session) {
      throw new Error("로그인 정보가 없습니다.");
    }

    const passwordData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    const userInfo = {
      email: session.user.email,
      name: session.user.name,
    };

    const result = await changePassword(passwordData, userInfo);

    const resultData = {
      message: result.message,
      status: result.status,
    };
    return NextResponse.json(resultData);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(e) });
    }
  }
}
