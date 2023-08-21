"use client";

import { useSession } from "next-auth/react";

export default function JwtTestPage() {
  const { data: session } = useSession();
  async function testButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("api/jwttest", {
      method: "GET",
      headers: {
        authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    const data = await response.json();
    console.log("data", data);
  }

  return (
    <div>
      <form onSubmit={testButton}>
        <button>확인</button>
      </form>
    </div>
  );
}
