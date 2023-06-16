import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth";

export async function myGetServerSession() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/in");
  }

  return session;
}
