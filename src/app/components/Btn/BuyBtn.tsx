"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/outline";
import Note from "../Note/Note";

export default function BuyBtn({
  email,
  id,
  iswish = false,
}: {
  email: string;
  id: string;
  iswish: boolean;
}) {
  const { data } = useSession();

  const [isWish, setIsWish] = useState(iswish);
  const [btn, setBtn] = useState(false);

  async function addWishList(addId: string) {
    setIsWish((is) => !is);
    setBtn(true);

    const response = await fetch("/api/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: addId }),
    });

    const result = await response.json();
    setBtn(false);
  }

  const isSameUser = data?.user.email === email;

  return (
    <div>
      {isSameUser && (
        <Link
          href={`/product/edit/${id}`}
          className="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700"
        >
          수정
        </Link>
      )}

      {data?.user && !isSameUser && (
        <button disabled={btn} onClick={() => addWishList(id)}>
          {isWish ? (
            <HeartIcon className="w-6 h-6 text-red-500" />
          ) : (
            <OutlineHeartIcon className="w-6 h-6 text-gray-500" />
          )}
        </button>
      )}
    </div>
  );
}
