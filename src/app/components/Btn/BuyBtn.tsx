"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/outline";
import { CounterContext } from "@/context/wish.context";

export default function BuyBtn({ email, id }: { email: string; id: string }) {
  const { data } = useSession();

  const { state, dispatch } = useContext(CounterContext);

  const [isWish, setIsWish] = useState(false);
  const [btn, setBtn] = useState(false);

  console.log(state);

  useEffect(() => {
    const existingItem = state.ids.find((item) => item.id === id);
    setIsWish(existingItem ? existingItem.is : false);
  }, [state.ids, id]);

  const handleToggleIs = (id: string) => {
    const existingItem = state.ids.find((item) => item.id === id);

    if (existingItem) {
      dispatch({ type: "WISH", payload: { id, is: false } });
    } else {
      dispatch({ type: "WISH", payload: { id, is: true } });
    }
  };

  async function addWishList(addId: string) {
    setIsWish((is) => !is);
    setBtn(true);

    handleToggleIs(addId);
    // const response = await fetch("/api/wishlist/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ id: addId }),
    // });

    // const result = await response.json();
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
