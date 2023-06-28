"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "../Btn/DeleteModeal";
import { ProductsType } from "../../type/type";

export default function MyProductsList({
  products,
}: {
  products: ProductsType[];
}) {
  // 더미 데이터
  // const products = [
  //   {
  //     id: 1,
  //     title: "Product 1",
  //     description: "This is product 1 description.",
  //     image: "https://dummyimage.com/300x200/ccc/000",
  //     price: 10,
  //   },
  //   {
  //     id: 2,
  //     title: "Product 2",
  //     description: "This is product 2 description.",
  //     image: "https://dummyimage.com/300x200/ccc/000",
  //     price: 20,
  //   },
  //   {
  //     id: 3,
  //     title: "Product 3",
  //     description: "This is product 3 description.",
  //     image: "https://dummyimage.com/300x200/ccc/000",
  //     price: 30,
  //   },
  //   {
  //     id: 4,
  //     title: "Product 4",
  //     description: "This is product 4 description.",
  //     image: "https://dummyimage.com/300x200/ccc/000",
  //     price: 40,
  //   },
  //   {
  //     id: 5,
  //     title: "Product 4",
  //     description: "This is product 4 description.",
  //     image: "https://dummyimage.com/300x200/ccc/000",
  //     price: 40,
  //   },
  //   {
  //     id: 6,
  //     title: "Product 4",
  //     description: "This is product 4 description.",
  //     image: "https://dummyimage.com/300x200/ccc/000",
  //     price: 40,
  //   },
  //   {
  //     id: 7,
  //     title: "Product 4",
  //     description: "This is product 4 description.",
  //     image: "https://dummyimage.com/300x200/ccc/000",
  //     price: 40,
  //   },
  // ];

  const [isModal, setIsModal] = useState(false);
  const [modalId, setModalId] = useState<string | null>(null);

  function deleteHandler(id: string) {
    setIsModal(true);
    setModalId(id);
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-3xl font-bold mb-8">내가 올린 물건</h1>
      {products?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <li key={product._id} className="bg-white shadow-lg rounded-lg p-4">
              {modalId === product._id && isModal && (
                <Modal setIsModal={setIsModal} id={modalId} />
              )}
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
              <div className="mt-4 flex justify-evenly items-center">
                <Link
                  href={`/profile/message/${product._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  쪽지
                </Link>
                <Link
                  href={`/product/edit/${product._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  수정
                </Link>
                <button
                  onClick={() => deleteHandler(product._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-lg">등록된 물건이 없습니다.</p>
      )}
    </div>
  );
}
