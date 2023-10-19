import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ClientGetSession() {
  const { status, data } = useSession({
    required: false,
    onUnauthenticated() {
      redirect("/auth/in");
    },
  });

  const session = { status, data };

  return session;
}
