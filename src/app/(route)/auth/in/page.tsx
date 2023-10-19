import SignIn from "@/app/_components/Auth/SignIn";
import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <SignIn />;
}
