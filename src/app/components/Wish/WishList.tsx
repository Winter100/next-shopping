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
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-3xl font-bold mb-8">찜 목록</h1>
      {wishData?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishData.map((product) => (
            <li key={product._id} className="bg-white shadow-lg rounded-lg p-4">
              <div onClick={() => handleItemClick(product._id)}>
                <input
                  type="checkbox"
                  value={product._id}
                  checked={selectedItems.includes(product._id)}
                  onChange={() => {}}
                />
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg text-center font-semibold">
                  {product.title}
                </h2>
              </div>
              <div className="mt-4 flex justify-evenly items-center">
                <Link
                  href={`/product/detail/${product._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  보기
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-lg">찜 목록이 없습니다.</p>
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
