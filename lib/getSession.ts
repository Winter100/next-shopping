import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function myGetServerSession() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/in");
  }

  return session;
}
