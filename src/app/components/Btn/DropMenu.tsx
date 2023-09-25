"use client";
import Link from "next/link";
import { useState } from "react";
import Modal from "./DeleteModal";

export default function MyProductMenu({
  productId,
  soldout,
  handleDropdownToggle,
}: {
  productId: string;
  soldout: boolean;
  handleDropdownToggle: any;
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
    <div className="absolute z-10 right-0 mt-2 w-28 bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg">
      {modalId === productId && isModal && (
        <Modal
          handleDropdownToggle={handleDropdownToggle}
          setIsModal={setIsModal}
          id={modalId}
          method={method}
        />
      )}
      <div className="py-1 ">
        {!soldout && (
          <>
            <Link
              href={`/product/edit/${productId}`}
              className="w-full block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
            >
              수정
            </Link>
            <button
              onClick={() => soldOutHandler(productId)}
              className="text-center block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              판매완료
            </button>
            <button
              onClick={() => deleteHandler(productId)}
              className="text-center  block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              삭제
            </button>
          </>
        )}
        {soldout && (
          <button
            onClick={() => deleteHandler(productId)}
            className="text-center block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 w-full"
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
}
