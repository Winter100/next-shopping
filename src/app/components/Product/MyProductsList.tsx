"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductsType } from "../../type/type";
import MyProductMenu from "../Btn/DropMenu";
import Link from "next/link";
// ...

export default function MyProductsList({
  products,
}: {
  products: ProductsType[];
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);

  function handleDropdownToggle(id: string) {
    setIsDropdownOpen((prevId) => (prevId === id ? null : id));
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-8 mt-14">내가 올린 물건</h1>
      {products?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <li key={product._id} className="bg-white shadow-lg rounded-lg p-4">
              <div className="relative">
                <div className="absolute top-0 right-0">
                  <button
                    onClick={() => handleDropdownToggle(product._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="" clipRule="evenodd" />
                    </svg>
                  </button>
                  {isDropdownOpen === product._id && (
                    <MyProductMenu
                      productId={product._id}
                      soldout={product.soldout}
                    />
                  )}
                </div>
              </div>
              <Image
                src={
                  product.soldout === true
                    ? process.env.NEXT_PUBLIC_SOLDOUT_IMAGE
                    : product.mainImageSrc
                }
                alt={product.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <Link
                href={`/product/detail/${product._id}`}
                className=" text-base text-center font-semibold hover:text-lime-600"
              >
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-lg">등록된 물건이 없습니다.</p>
      )}
    </div>
  );
}
