import SignIn from "@/app/components/Auth/SignIn";
import { authOptions } from "@/app/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "로그인 페이지",
  description: "사용자 로그인을 하기위한 페이지입니다.",
};

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <SignIn />;
}
