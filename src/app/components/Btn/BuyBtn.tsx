"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    queryFn: () => getWish(data?.user?.email),
  });

  const queryClient = useQueryClient();

  const addWishlistItemMutation = useMutation(addWishlistItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  const handleAddToWishlist = (itemId: string) => {
    addWishlistItemMutation.mutate(itemId);
  };

  if (isLoading) {
    return <p></p>;
  }

  const isSameUser = data?.user?.email === email;

  const getwish = wish.find((item) => item === id);

  return (
    <div>
      {!soldout && isSameUser && (
        <Link
          href={`/product/edit/${id}`}
          className="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700"
        >
          수정
        </Link>
      )}

      {data?.user && !isSameUser && (
        <button onClick={() => handleAddToWishlist(id)}>
          {getwish ? (
            <HeartIcon className="w-6 h-6 text-red-500" />
          ) : (
            <OutlineHeartIcon className="w-6 h-6 text-gray-500" />
          )}
        </button>
      )}
    </div>
  );
}
