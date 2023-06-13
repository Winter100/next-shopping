import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ClientGetSession() {
  const { status, data } = useSession({
    //true면 user정보가 없을시 onUnauthenticated() 가 실행됨
    required: false,
    onUnauthenticated() {
      redirect("/auth/in");
    },
  });

  const session = { status, data };

  return session;
}
