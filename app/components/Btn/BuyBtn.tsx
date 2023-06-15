"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function BuyBtn({ email, id }: { email: string; id: string }) {
  const { data } = useSession();

  return (
    <>
      {data?.user.email === email ? (
        <Link
          href={`/product/edit/${id}`}
          className="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700"
        >
          수정
        </Link>
      ) : (
        <button className="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700">
          구매문의
        </button>
      )}
    </>
  );
}
