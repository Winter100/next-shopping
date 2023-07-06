"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useUploadThing } from "@/utils/uploadthing";
import { isFieldEmpty } from "@/utils/utils";

interface AddProductProps {
  editData: any;
  method: string;
}

export default function AddProcuct({ editData = "", method }: AddProductProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      //이미지 업로드 완료시
      const suc = "성공";
      return suc;
    },
    onUploadError: () => {
      //이미지 업로드 실패시
    },
  });

  async function uploadStart(files: any) {
    const result = await startUpload(files);
    return result[0].fileUrl;
  }

  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(editData?.imageSrc || "");
  const [files, setFiles] = useState<File[]>(null);
  const [price, setPrice] = useState<number | null>(editData?.price || 0);
  const [title, setTitle] = useState<string | null>(editData?.title || "");
  const [contact, setContact] = useState<string | null>(
    editData?.contact || ""
  );

  const [selectedValue, setSelectedValue] = useState({
    random: editData?.selectedValue?.random || "yes",
    isMeet: editData?.selectedValue?.isMeet || "yes",
    bargaining: editData?.selectedValue?.bargaining || "yes",
  });
  const [description, setDescription] = useState(editData?.description || "");

  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("auth/in");
    },
  });

  function selectedChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setSelectedValue({
      ...selectedValue,
      [name]: value,
    });
  }
  function contactChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setContact(e.target.value);
  }
  function titleChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  function priceChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPrice(Number(e.target.value));
  }
  function descriptionChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFiles([file]);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = reader.result as string;
        setImage(image);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("등록중...");

    if (
      isFieldEmpty(image) ||
      isFieldEmpty(title) ||
      isFieldEmpty(price) ||
      isFieldEmpty(description) ||
      isFieldEmpty(contact) ||
      title.trim().length > 20 ||
      !data?.user
    ) {
      setMessage("모든 내용을 채워주세요.");
      return;
    }

    let imageSrc = files ? await uploadStart(files) : image;

    const requestData = {
      title,
      description,
      price,
      selectedValue,
      imageSrc,
      contact,
      email: data?.user?.email,
      name: data?.user?.name,
      _id: method === "PATCH" ? editData._id : null,
    };

    try {
      const response = await fetch("/api/editproduct/edit/addoredit", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        window.location.href = "/";
      } else {
        setMessage("잠시 후 다시 시도해주세요.");
      }
    } catch (error) {
      setMessage("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  return (
    <form className="container mx-auto py-8" onSubmit={handleSubmit}>
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 h-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[528px] md:mr-8">
            <div className="border-2 h-[792px]">
              {image && (
                <Image src={image} alt="이미지" width={400} height={300} />
              )}
            </div>
            <div className="text-center mt-2 ">
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                id="mainImage"
                accept="image/*"
                name="imageSrc"
              />
              <label
                htmlFor="mainImage"
                className="bg-zinc-100 px-1 py-1 text-gray-600 rounded-lg cursor-pointer hover:text-black hover:font-bold"
              >
                대표 이미지 업로드
              </label>
            </div>
          </div>

          <div className="md:w-1/2 md:ml-8">
            <div className="text-4xl font-semibold text-gray-800 text-center mb-10">
              <label className="block font-bold mb-1" htmlFor="title">
                제품명
              </label>
              <input
                onChange={titleChangeHandler}
                required
                value={title}
                id="title"
                name="title"
                type="text"
                placeholder="최대 20자"
                maxLength={20}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                옵션
              </h2>
              <table>
                <tbody>
                  <tr>
                    <td className="font-semibold text-sm w-1/4">흥정여부</td>
                    <td>
                      <select
                        onChange={selectedChangeHandler}
                        value={selectedValue.bargaining}
                        name="bargaining"
                        className="block w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="" disabled>
                          -- 선택 --
                        </option>
                        <option value="yes">가능</option>
                        <option value="no">불가능</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-sm w-1/4">직거래</td>
                    <td>
                      <select
                        onChange={selectedChangeHandler}
                        value={selectedValue.isMeet}
                        name="isMeet"
                        className="block w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="" disabled>
                          -- 선택 --
                        </option>
                        <option value="yes">가능</option>
                        <option value="no">불가능</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-sm w-1/4">지역선택</td>
                    <td>
                      <select
                        value={selectedValue.random}
                        onChange={selectedChangeHandler}
                        name="random"
                        className="block w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="" disabled>
                          -- 선택 --
                        </option>
                        <option value="yes">가능</option>
                        <option value="no">불가능</option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td className=" font-semibold text-sm w-1/4">카카오톡</td>
                    <td>
                      <input
                        required
                        onChange={contactChangeHandler}
                        value={contact}
                        type="text"
                        placeholder="카톡 아이디"
                        name="contact"
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className=" font-semibold text-sm w-1/4">희망가격</td>
                    <td>
                      <input
                        onChange={priceChangeHandler}
                        required
                        value={price}
                        type="number"
                        name="price"
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center mb-4">
              <span>{price.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <label htmlFor="description" className="block text-center text-2xl">
            설명
          </label>
          <textarea
            required
            onChange={descriptionChangeHandler}
            value={description}
            name="description"
            id="description"
            className="resize-none w-full h-[600px] "
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700"
          >
            {method === "PATCH" ? "수정하기" : "등록"}
          </button>
          <p>{message}</p>
        </div>
      </div>
    </form>
  );
}
