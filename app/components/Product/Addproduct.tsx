"use client";
import React, { useState } from "react";
import Image from "next/image";

import { POST } from "@/app/api/addproducts/route";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AddProcuct() {
  const [image, setImage] = useState<string | null>(null);
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("");
  const [selectedValue, setSelectedValue] = useState({
    random: "yes",
    isMeet: "yes",
    bargaining: "yes",
  });

  const [description, setDescription] = useState("");

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

    if (
      !image ||
      !title ||
      !price ||
      !description ||
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      data?.user === null
    ) {
      return;
    }

    const addData = {
      title,
      description,
      price,
      selectedValue,
      imageSrc: image,
      email: data?.user?.email,
      name: data?.user?.name,
    };

    await POST(addData);
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
                className="hidden"
                id="mainImage"
                accept="image/*"
                onChange={handleImageChange}
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
            <div className="text-4xl font-semibold text-gray-800 mb-3 text-center mb-10">
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
          <button className="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700">
            등록하기
          </button>
        </div>
      </div>
    </form>
  );
}
