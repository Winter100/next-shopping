"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { cache, use } from "react";

export default function Profile() {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/in");
    },
  });

  console.log(data?.user?.name);

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  return <main>123456</main>;
}
