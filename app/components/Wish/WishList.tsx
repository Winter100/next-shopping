"use client";
import { ProductsType } from "@/type/type";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "../Btn/DeleteModeal";

export default function MyProductsList() {
  const products = [
    {
      id: 1,
      title: "Product 1",
      description: "This is product 1 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 10,
    },
    {
      id: 2,
      title: "Product 2",
      description: "This is product 2 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 20,
    },
    {
      id: 3,
      title: "Product 3",
      description: "This is product 3 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 30,
    },
    {
      id: 4,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 5,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 6,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 7,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 17,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 27,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 37,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 47,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 57,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 67,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 77,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 87,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 97,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
    {
      id: 12,
      title: "Product 4",
      description: "This is product 4 description.",
      image: "https://dummyimage.com/300x200/ccc/000",
      price: 40,
    },
  ];

  const [isModal, setIsModal] = useState(false);
  const [modalId, setModalId] = useState<string | number>(null);

  function deleteHandler(id: string | number) {
    setIsModal(true);
    setModalId(id);
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-3xl font-bold mb-8">찜 목록</h1>
      {products?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <li key={product.id} className="bg-white shadow-lg rounded-lg p-4">
              <Image
                src={product.image}
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
                  href={"/"}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  쪽지
                </Link>
                <Link
                  href={`/product/edit/${product.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  수정
                </Link>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-lg">찜 목록이 없습니다.</p>
      )}
    </div>
  );
}
