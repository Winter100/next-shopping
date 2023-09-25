"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductsType } from "../../type/type";
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

  const gridTitleStyle = "w-full text-xs grid grid-cols-11 text-center";
  const grid2SpanStyle = "col-span-2";
  const gridSpan8Style = "col-span-9  md:text-xs";
  const gridItemDibStyle = "grid grid-cols-5 h-full  ";
  const gridItemStyle = "flex items-center justify-center px-2 text-xs";

  return (
    <div className="container mx-auto   ">
      <h1 className="hidden">내 판매 목록</h1>
      <div className={`${gridTitleStyle} border-y h-12 `}>
        <div className={`${grid2SpanStyle} flex justify-center`}>
          <div className={gridItemStyle}>상품명</div>
        </div>
        <div className={gridSpan8Style}>
          <div className={gridItemDibStyle}>
            <div className={gridItemStyle}>제목</div>
            <div className={gridItemStyle}>판매가</div>
            <div className={gridItemStyle}>판매상태</div>
            <div className={gridItemStyle}>등록일</div>
            <div className={gridItemStyle}>편집</div>
          </div>
        </div>
      </div>
      {products?.length > 0 && (
        <ul className="grid grid-flow-row  ">
          {products?.map((product) => (
            <li
              key={product?._id}
              className={`${gridTitleStyle} ${
                isDropdownOpen === product?._id ? "bg-blue-gray-50" : ""
              } hover:bg-blue-gray-50 border-b h-24`}
            >
              <div className={`${grid2SpanStyle} relative`}>
                <Link href={`/product/detail/${product._id}`}>
                  <Image
                    className="py-2 px-1 md:px-6"
                    src={product?.mainImageSrc}
                    alt={product?.title}
                    fill
                  />
                </Link>
              </div>
              <div className={`${gridSpan8Style} `}>
                <div className={`${gridItemDibStyle} `}>
                  <div className={`${gridItemStyle} `}>{product?.title}</div>
                  <div className={`${gridItemStyle} `}>
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
                  <div className={gridItemStyle}>
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
      )}
    </div>
  );
}
