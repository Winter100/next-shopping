"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductsType } from "../../type/type";
import MyProductMenu from "../Btn/DropMenu";
import Link from "next/link";

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
    <div className="container mx-auto px-4 ">
      <h1 className="text-3xl font-bold my-4 ">내가 올린 물건</h1>
      {products?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <li
              key={product._id}
              className="bg-white shadow-lg rounded-lg p-4 border-2"
            >
              <div className="relative">
                <div className="absolute top-0 right-0">
                  <button
                    onClick={() => handleDropdownToggle(product._id)}
                    className="bg-black text-white  px-1 py-1 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-align-justify"
                    >
                      <line x1="21" y1="10" x2="3" y2="10"></line>
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="14" x2="3" y2="14"></line>
                      <line x1="21" y1="18" x2="3" y2="18"></line>
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
