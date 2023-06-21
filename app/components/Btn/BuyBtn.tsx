"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/outline";

export default function BuyBtn({ email, id }: { email: string; id: string }) {
  const { data } = useSession();

  const [isWish, setIsWish] = useState(false);

  async function addWishList(addId: string) {
    setIsWish((is) => !is);
  }

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
        <>
          <button className="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700">
            구매문의
          </button>
          <button onClick={() => addWishList(id)}>
            {isWish ? (
              <HeartIcon className="w-6 h-6 text-red-500" />
            ) : (
              <OutlineHeartIcon className="w-6 h-6 text-gray-500" />
            )}
          </button>
        </>
      )}
    </>
  );
}
