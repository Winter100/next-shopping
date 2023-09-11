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
    <div className="container mx-auto p-2">
      <h1 className="hidden ">내 판매 목록</h1>
      {products?.length > 0 && (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products?.map((product) => (
            <li
              key={product?._id}
              className="bg-white shadow-lg rounded-lg p-2 border-2"
            >
              <div className="relative">
                <div className="absolute top-0 right-0">
                  <button
                    onClick={() => handleDropdownToggle(product?._id)}
                    className="bg-black text-white p-1 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-align-justify"
                    >
                      <line x1="21" y1="10" x2="3" y2="10"></line>
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="14" x2="3" y2="14"></line>
                      <line x1="21" y1="18" x2="3" y2="18"></line>
                    </svg>
                  </button>
                  {isDropdownOpen === product?._id && (
                    <MyProductMenu
                      productId={product?._id}
                      soldout={product?.soldout}
                    />
                  )}
                </div>
              </div>
              <div className=" w-full h-[170px] md:h-[230px] relative ">
                <div className="w-full h-full relative">
                  <div className="absolute top-0 right-0 z-10">
                    <button
                      onClick={() => handleDropdownToggle(product?._id)}
                      className="bg-black text-white p-1 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-align-justify"
                      >
                        <line x1="21" y1="10" x2="3" y2="10"></line>
                        <line x1="21" y1="6" x2="3" y2="6"></line>
                        <line x1="21" y1="14" x2="3" y2="14"></line>
                        <line x1="21" y1="18" x2="3" y2="18"></line>
                      </svg>
                    </button>
                    {isDropdownOpen === product?._id && (
                      <MyProductMenu
                        productId={product?._id}
                        soldout={product?.soldout}
                      />
                    )}
                  </div>
                  {product?.soldout && (
                    <span className="p-1 bg-black top-0 left-0 text-xs absolute font-sans text-white z-10">
                      거래완료
                    </span>
                  )}
                  <Image
                    src={product?.mainImageSrc}
                    alt={product?.title}
                    fill
                    quality={80}
                    className="group-hover:opacity-75"
                  />
                </div>
              </div>
              <Link
                href={`/product/detail/${product?._id}`}
                className=" text-sm  font-semibold hover:text-lime-600"
              >
                <div className=" mt-1 truncate">{product?.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
