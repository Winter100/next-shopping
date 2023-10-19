import SignUp from "@/app/_components/Auth/SignUp";
import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return <SignUp />;
}
