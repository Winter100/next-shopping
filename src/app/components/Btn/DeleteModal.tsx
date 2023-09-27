"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import LoadingSpinner from "../Spinner/LoadingSpinner";

interface ModalProps {
  setSelectedItems?: any;
  setIsModal?: (isConfirmed: boolean) => void;
  handleDropdownToggle?: any;
  id?: string;
  method?: string;
  selectedItems?: any;
  addWishlistItemMutation?: any;
}

export default function Modal({
  setSelectedItems,
  addWishlistItemMutation,
  selectedItems,
  setIsModal,
  id,
  method,
  handleDropdownToggle,
}: ModalProps) {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const cancelButtonRef = useRef(null);
  const router = useRouter();

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("auth/in");
    },
  });

  async function submitHandler(isConfirm: boolean) {
    try {
      if (isConfirm) {
        setIsLoading(true);
        // 삭제 로직
        if (method === "DELETE") {
          const response = await fetch(`/api/editproduct/delete/${id}`, {
            method,
          });
          handleDropdownToggle(id);
        } else if (method === "POST") {
          const response = await fetch(`/api/editproduct/delete/${id}`, {
            method,
          });
          handleDropdownToggle(id);
        } else if (method === "wish") {
          const response = await fetch("/api/wishlist/delete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: selectedItems }),
          });
          await setSelectedItems([]);
          await addWishlistItemMutation.mutate("");
        }

        router.refresh();
        setOpen;
        setIsModal(false);
        return;
      } else {
        // 취소 로직
        if (isLoading) {
          return;
        }
        setOpen;
        setIsModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const modalMessage = {
    title: "",
    checkMessage: "",
    lastCheckMessage: "",
  };

  if (method === "DELETE") {
    modalMessage.title = "등록한 물품을 삭제하겠습니까?";
    modalMessage.checkMessage =
      "삭제한 물품은 되돌릴 수 없습니다. 삭제하시겠습니까?";
    modalMessage.lastCheckMessage = "네, 삭제하겠습니다.";
  } else if (method === "POST") {
    modalMessage.title = "등록한 물품의 판매를 완료하겠습니까?";
    modalMessage.checkMessage =
      "판매 완료한 물품은 되돌릴 수 없습니다. 판매 완료하시겠습니까?";
    modalMessage.lastCheckMessage = "네, 판매 완료하겠습니다.";
  } else if (method === "wish") {
    modalMessage.title = "선택 물품을 찜 목록에서 삭제하시겠습니까?";
    modalMessage.checkMessage =
      "삭제한 물품은 되돌릴 수 없습니다. 삭제하시겠습니까?";
    modalMessage.lastCheckMessage = "네, 삭제하겠습니다.";
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        initialFocus={cancelButtonRef}
        onClose={submitHandler}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {modalMessage.title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className=" text-xs md:text-sm  text-gray-500">
                          {modalMessage.checkMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    disabled={isLoading}
                    type="button"
                    className={`${
                      isLoading ? " bg-gray-200" : "bg-red-600"
                    } inline-flex w-full text-center justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
                    onClick={() => submitHandler(true)}
                  >
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      modalMessage.lastCheckMessage
                    )}
                  </button>
                  <button
                    disabled={isLoading}
                    type="button"
                    className={`${
                      isLoading ? " bg-gray-200" : "bg-white"
                    } mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto `}
                    onClick={() => submitHandler(false)}
                    ref={cancelButtonRef}
                  >
                    취소
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
