"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductsType } from "../../type/type";
import Modal from "../Btn/DeleteModal";
import trashIcon from "../../../../public/Menu/trash-2.svg";

export default function WishList({ products }: { products: ProductsType[] }) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isModal, setIsModal] = useState(false);

  function handleItemClick(itemId: string) {
    if (selectedItems.includes(itemId)) {
      setSelectedItems((prevItems) => prevItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems((prevItems) => [...prevItems, itemId]);
    }
  }

  function modalHandler() {
    if (isModal) return;
    setIsModal(true);
  }

  const gridTitleStyle = "w-full text-xs grid grid-cols-11 text-center";
  const grid2SpanStyle = "col-span-2";
  const gridSpan8Style = "col-span-9";
  const gridItemDibStyle = "grid grid-cols-6 h-full";
  const gridItemStyle = "flex items-center justify-center";

  return (
    <div className="container mx-auto p-2">
      <h1 className="hidden pt-2">찜 목록</h1>

      {isModal && (
        <Modal
          method="wish"
          selectedItems={selectedItems}
          setIsModal={setIsModal}
        />
      )}

      <div className={`${gridTitleStyle} border-y h-12 `}>
        <div className={`${grid2SpanStyle} flex justify-center`}>
          <div className={gridItemStyle}>상품명</div>
        </div>
        <div className={gridSpan8Style}>
          <div className={gridItemDibStyle}>
            <div className={gridItemStyle}>제목</div>
            <div className={gridItemStyle}>판매가</div>
            <div className={gridItemStyle}>판매상태</div>
            <div className={gridItemStyle}>판매자</div>
            <div className={gridItemStyle}>카카오톡</div>
            <div className={`${gridItemStyle} border-l`}>
              {selectedItems.length >= 1 && (
                <button onClick={modalHandler}>
                  <Image src={trashIcon} alt="삭제" title="삭제" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {products?.length > 0 && (
        <ul className="grid grid-flow-row gap-1 ">
          {products?.map((product) => (
            <li
              key={product?._id}
              className={`${gridTitleStyle} hover:bg-blue-gray-50 border-b h-24`}
            >
              <div className={`${grid2SpanStyle} relative`}>
                <Link href={`/product/detail/${product._id}`}>
                  <Image
                    className="py-2 px-4"
                    src={product?.mainImageSrc}
                    alt={product?.title}
                    fill
                  />
                </Link>
              </div>
              <div className={gridSpan8Style}>
                <div className={gridItemDibStyle}>
                  <div className={gridItemStyle}>{product?.title}</div>
                  <div className={gridItemStyle}>
                    {product?.price.toLocaleString()}원
                  </div>
                  <div className={gridItemStyle}>
                    {product?.soldout ? (
                      <span className=" text-red-600">판매완료</span>
                    ) : (
                      <span className=" text-blue-600">판매중</span>
                    )}
                  </div>
                  <div className={gridItemStyle}>{`${product?.name}`}</div>
                  <div className={gridItemStyle}>{`${product?.contact}`}</div>
                  <div className={`${gridItemStyle} border-l `}>
                    <div
                      onClick={() => handleItemClick(product?._id)}
                      className={`${gridItemStyle} w-full h-full`}
                    >
                      <input
                        disabled={isModal}
                        checked={selectedItems.includes(product._id)}
                        type="checkbox"
                        onChange={() => {}}
                      />
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
