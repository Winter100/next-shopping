"use client";
import Link from "next/link";
import { useState } from "react";
import Modal from "./DeleteModeal";

export default function MyProductMenu({
  productId,
  soldout,
}: {
  productId: string;
  soldout: boolean;
}) {
  const [isModal, setIsModal] = useState(false);
  const [modalId, setModalId] = useState<string | null>(null);
  const [method, setMethod] = useState("");

  function deleteHandler(id: string) {
    setIsModal(true);
    setModalId(id);
    setMethod("DELETE");
  }

  async function soldOutHandler(id: string) {
    setIsModal(true);
    setModalId(id);
    setMethod("POST");
  }

  return (
    <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg">
      {modalId === productId && isModal && (
        <Modal setIsModal={setIsModal} id={modalId} method={method} />
      )}
      <div className="py-1">
        {!soldout && (
          <>
            <Link
              href={`/product/edit/${productId}`}
              className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              수정
            </Link>
            <button
              onClick={() => deleteHandler(productId)}
              className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              삭제
            </button>
            <button
              onClick={() => soldOutHandler(productId)}
              className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              판매완료
            </button>
          </>
        )}
        {soldout && (
          <button
            onClick={() => deleteHandler(productId)}
            className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
}
