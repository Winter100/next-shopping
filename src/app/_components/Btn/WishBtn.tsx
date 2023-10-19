"use client";

import { useSession } from "next-auth/react";
import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Spinner/LoadingSpinner";

interface PropsType {
  uploademail: string;
  uploadid: string;
}

export default function WishBtn({ uploademail, uploadid }: PropsType) {
  const { data } = useSession();

  async function getWish(email: string) {
    const res = await fetch(`/api/wishlist/getid`, {
      cache: "no-store",
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

  const {
    data: wish,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => await getWish(data?.user?.email),
    // cacheTime: 0,
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
    if (wish && wishList.includes(uploadid)) {
      setIsWished(true);
    }
  }, [wish, uploadid, data]);

  const handleAddToWishlist = (itemId: string) => {
    setIsWished((pre) => !pre);
    addWishlistItemMutation.mutate("테스트");
    return;
  };

  const divStyle = "w-6 h-6 text-center m-auto flex items-center justify-cente";
  const isSameUser = data?.user?.email === uploademail;

  if (isLoading) {
    return data && !isSameUser ? (
      <div className={divStyle}>
        <div className="w-fit mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    ) : null;
  }

  return (
    <div className={divStyle}>
      {data?.user && !isSameUser && (
        <button onClick={() => handleAddToWishlist(uploadid)}>
          {isWished ? (
            <HeartIcon className="w-full h-full text-red-500" />
          ) : (
            <OutlineHeartIcon className="w-full h-full text-gray-500" />
          )}
        </button>
      )}
    </div>
  );
}
