"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface PropsType {
  email: string;
  id: string;
  soldout: boolean;
}

async function getWish(email: string) {
  const res = await fetch(`/api/wishlist/getid`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const wish = (await res.json()) as [];
  return wish;
}

async function addWishlistItem(itemId: string) {
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

export default function BuyBtn({ email, id, soldout }: PropsType) {
  const { data } = useSession();

  const {
    data: wish,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => await getWish(data?.user?.email),
    cacheTime: 0,
  });

  const queryClient = useQueryClient();

  const addWishlistItemMutation = useMutation(addWishlistItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    const wishList: string[] = wish;
    if (wish && wishList.includes(id)) {
      setIsWished(true);
    }
  }, [wish, id]);

  const handleAddToWishlist = (itemId: string) => {
    setIsWished((pre) => !pre);
    addWishlistItemMutation.mutate(itemId);
    return;
  };

  if (isLoading) {
    return <div></div>;
  }

  const isSameUser = data?.user?.email === email;

  return (
    <div className="m-auto text-center w-2/3">
      {!soldout && isSameUser && (
        <Link
          href={`/product/edit/${id}`}
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700"
        >
          수정
        </Link>
      )}

      <div className="w-6 h-6 text-center m-auto">
        {data?.user && !isSameUser && (
          <button onClick={() => handleAddToWishlist(id)}>
            {isWished ? (
              <HeartIcon className="w-full h-full text-red-500" />
            ) : (
              <OutlineHeartIcon className="w-full h-full text-gray-500" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
