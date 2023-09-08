"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductsType } from "../../type/type";

export default function WishList({ wishData }: { wishData: ProductsType[] }) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const router = useRouter();

  function handleItemClick(itemId: string) {
    if (selectedItems.includes(itemId)) {
      setSelectedItems((prevItems) => prevItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems((prevItems) => [...prevItems, itemId]);
    }
  }

  async function handleDelete() {
    const response = await fetch("/api/wishlist/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: selectedItems }),
    });
    if (!response.ok) {
      router.refresh();
    }
    const data = await response.json();
    if (data.status === 201) {
      router.refresh();
    } else {
      router.push("/");
    }
    return router.refresh();
  }

  return (
    <div className="container mx-auto px-4 my-4">
      <h1 className="hidden">찜 목록</h1>
      {wishData?.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishData?.map((product) => (
            <li
              key={product._id}
              className="bg-white shadow-lg rounded-lg p-4 border-2"
            >
              <div onClick={() => handleItemClick(product._id)}>
                <input
                  type="checkbox"
                  value={product._id}
                  checked={selectedItems.includes(product._id)}
                  onChange={() => {}}
                />
                <Image
                  src={product.mainImageSrc}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              </div>
              <Link
                href={`/product/detail/${product._id}`}
                className="text-base text-center font-semibold hover:text-lime-600"
              >
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {selectedItems.length > 0 && (
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          삭제
        </button>
      )}
    </div>
  );
}
