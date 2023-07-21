import SignUp from "@/app/components/Auth/SignUp";
import { authOptions } from "@/app/lib/auth";
// import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// export const metadata: Metadata = {
//   title: "회원가입",
//   description: "회원가입을 위한 페이지 입니다.",
// };

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return <SignUp />;
}
