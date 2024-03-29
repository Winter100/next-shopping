"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductsType } from "../../_type/type";
import Modal from "../Btn/DeleteModal";
import trashIcon from "../../../../public/Menu/trash-2.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../Spinner/LoadingSpinner";

export default function WishList({
  email,
}: {
  products?: ProductsType[];
  email: string;
}) {
  async function getWish(email: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/get`,
        {
          cache: "no-store",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const wish: ProductsType[] = (await response.json()) as [];
      return wish;
    } catch (e) {
      return [];
    }
  }

  const {
    data: wish,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => await getWish(email),
    // cacheTime: 0,
  });
  const queryClient = useQueryClient();

  const addWishlistItemMutation = useMutation(async () => {}, {
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

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

  const gridTitleStyle = "w-full text-xs grid grid-cols-6 text-center px-1";
  const gridSpan8Style = "col-span-6  sm:text-xs";
  const gridItemDibStyle = "grid grid-cols-6 h-full ";
  const gridItemTitleStyle = "flex items-center justify-center text-sm";
  const gridItemStyle = "flex items-center justify-center text-xs";

  return (
    <div className="container mx-auto ">
      <h1 className="hidden">찜 목록</h1>

      {isModal && (
        <Modal
          setSelectedItems={setSelectedItems}
          addWishlistItemMutation={addWishlistItemMutation}
          method="wish"
          selectedItems={selectedItems}
          setIsModal={setIsModal}
        />
      )}

      <div className={`${gridTitleStyle} border-y h-10 `}>
        <div className={gridSpan8Style}>
          <div className={gridItemDibStyle}>
            <div className={`${gridItemTitleStyle}`}>제목</div>
            <div className={gridItemTitleStyle}>판매가</div>
            <div className={gridItemTitleStyle}>판매상태</div>
            <div className={gridItemTitleStyle}>판매자</div>
            <div className={gridItemTitleStyle}>카카오톡</div>
            <div className={`${gridItemTitleStyle} border-l`}>
              {isFetching && (
                <div className=" flex items-center justify-center my-2">
                  <LoadingSpinner />
                </div>
              )}
              {selectedItems.length >= 1 && !isLoading && !isFetching && (
                <button onClick={modalHandler}>
                  <Image src={trashIcon} alt="삭제" title="삭제" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {wish?.length >= 1 && !isLoading && (
        <ul className="grid grid-flow-row">
          {wish?.map((product) => (
            <li
              key={product?._id}
              className={`${gridTitleStyle} px-1 hover:bg-blue-gray-50 border-b h-28`}
            >
              <div className={gridSpan8Style}>
                <div className={gridItemDibStyle}>
                  <div className={`relative`}>
                    <div className=" grid grid-rows-5 h-full sm:px-3">
                      <div className=" row-span-4 relative">
                        <Link href={`/product/detail/${product._id}`}>
                          <Image
                            className="py-1"
                            src={product?.mainImageSrc}
                            alt={product?.title}
                            fill
                          />
                        </Link>
                      </div>
                      <div
                        title={product?.title}
                        className={`flex items-center text-xs row-span-1 truncate `}
                      >
                        {product?.title}
                      </div>
                    </div>
                  </div>
                  <div
                    title={product?.price.toLocaleString()}
                    className={`${gridItemStyle} text-blue-600`}
                  >
                    {product?.price.toLocaleString()}
                  </div>
                  <div className={gridItemStyle}>
                    {product?.soldout ? (
                      <span className=" text-red-600">판매완료</span>
                    ) : (
                      <span className=" text-blue-600">판매중</span>
                    )}
                  </div>
                  <div className={`${gridItemStyle}`}>{`${product?.name}`}</div>
                  <div
                    className={`${gridItemStyle} `}
                  >{`${product?.contact}`}</div>
                  <div className={`${gridItemStyle} border-l `}>
                    <div
                      onClick={() => handleItemClick(product?._id)}
                      className={`${gridItemStyle} w-full h-full`}
                    >
                      <input
                        disabled={isModal}
                        checked={selectedItems.includes(product?._id)}
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
      {wish?.length < 1 && !isLoading && (
        <p className="text-lg text-center text-red-600 text-bold my-8 m-auto">
          찜하고 있는 물건이 없습니다.
        </p>
      )}
    </div>
  );
}
