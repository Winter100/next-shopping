"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductsType } from "../../_type/type";
import MyProductMenu from "../Btn/DropMenu";
import MoreIcon from "../../../../public/Menu/more.svg";
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

  const gridTitleStyle = "w-full text-sm grid grid-cols-5 text-center px-1";
  const gridSpan8Style = "col-span-5  sm:text-xs";
  const gridItemDibStyle = "grid grid-cols-5 h-full ";
  const gridItemTitleStyle = "flex items-center justify-center text-sm";
  const gridItemStyle = "flex items-center justify-center text-xs";

  return (
    <div className="container mx-auto    ">
      <h1 className="hidden">내 판매 목록</h1>

      <div className={`${gridTitleStyle}  border-y h-10 `}>
        <div className={gridSpan8Style}>
          <div className={gridItemDibStyle}>
            <div className={gridItemTitleStyle}>제목</div>
            <div className={gridItemTitleStyle}>판매가</div>
            <div className={gridItemTitleStyle}>판매상태</div>
            <div className={gridItemTitleStyle}>등록일</div>
            <div className={`${gridItemTitleStyle} border-l`}>편집</div>
          </div>
        </div>
      </div>
      {products?.length >= 1 ? (
        <div>
          <ul className="grid grid-flow-row">
            {products?.map((product) => (
              <li
                key={product?._id}
                className={`${gridTitleStyle} ${
                  isDropdownOpen === product?._id ? "bg-blue-gray-50" : ""
                } hover:bg-blue-gray-50 border-b h-28 px-1 `}
              >
                <div className={`${gridSpan8Style} `}>
                  <div className={`${gridItemDibStyle} `}>
                    <div className={`relative`}>
                      <div className=" grid grid-rows-5 h-full sm:px-3">
                        <div className=" row-span-4 relative">
                          <Link href={`/product/detail/${product._id}`}>
                            <Image
                              className="py-1 sm:px-2"
                              src={product?.mainImageSrc}
                              alt={product?.title}
                              fill
                            />
                          </Link>
                        </div>
                        <div
                          title={product?.title}
                          className={`sm:px-2 flex items-center text-xs row-span-1 truncate `}
                        >
                          {product?.title}
                        </div>
                      </div>
                    </div>
                    <div className={`${gridItemStyle} text-blue-600`}>
                      {product?.price.toLocaleString()}
                    </div>
                    <div className={gridItemStyle}>
                      {product?.soldout ? (
                        <span className=" text-red-600">판매완료</span>
                      ) : (
                        <span className=" text-blue-600">판매중</span>
                      )}
                    </div>
                    <div className={gridItemStyle}>
                      <ul className="md:flex md:items-center md:justify-center">
                        <li>{product?.date?.year}</li>
                        <li className="ml-1">
                          {product?.date?.month < 10
                            ? `0${product?.date?.month} `
                            : product?.date?.month}
                        </li>
                        <li className="ml-1">{`${
                          product?.date?.day < 10
                            ? `0${product?.date?.day} `
                            : product?.date?.day
                        }`}</li>
                      </ul>
                    </div>
                    <div className={`${gridItemStyle} border-l `}>
                      <div className={`${gridItemStyle} w-full h-full`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDropdownToggle(product?._id);
                          }}
                        >
                          <Image src={MoreIcon} alt="메뉴버튼" />
                        </button>
                        <div className=" relative -top-14 -left-8 md:left-28">
                          {isDropdownOpen === product?._id && (
                            <MyProductMenu
                              productId={product?._id}
                              soldout={product?.soldout}
                              handleDropdownToggle={handleDropdownToggle}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-lg text-center text-red-600 text-bold my-8 m-auto">
          판매하고 있는 물건이 없습니다.
        </p>
      )}
    </div>
  );
}
