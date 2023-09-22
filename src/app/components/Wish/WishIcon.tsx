"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/outline";
import LoadingSpinner from "../Spinner/LoadingSpinner";

export default function WishIcon({
  productId,
  productEmail,
}: {
  productId: string;
  productEmail: string;
}) {
  const { data } = useSession();
  const email = data?.user?.email;

  const pathname = usePathname().replace("/product/detail/", "");
  const [myWishList, setMyWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!data) return;
    async function getWished() {
      const res = await fetch(`/api/wishlist/getid`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setMyWishList(data);
      setIsLoading(false);
    }

    getWished();
  }, [email, data, productId]);

  async function addWishlistItem(itemId: string) {
    setMyWishList((pre) =>
      pre.includes(itemId)
        ? pre.filter((wishedId) => wishedId !== itemId)
        : [...pre, itemId]
    );
    const response = await fetch("/api/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: itemId }),
    });
    const result = await response.json();
    return result;
  }

  const divStyle = "w-6 h-6 text-center m-auto flex items-center justify-cente";
  const isSameUser = data?.user?.email === productEmail;

  return (
    <div className={divStyle}>
      {!isLoading && data?.user && !isSameUser && (
        <button onClick={() => addWishlistItem(productId)}>
          {myWishList?.includes(pathname) ? (
            <HeartIcon className="w-full h-full text-red-500" />
          ) : (
            <OutlineHeartIcon className="w-full h-full text-gray-500" />
          )}
        </button>
      )}
      {isLoading && <LoadingSpinner />}
    </div>
  );
}
