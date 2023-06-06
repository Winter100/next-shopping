"use client";
import React, { useState } from "react";

export default function AddProcuct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);

  function priceChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPrice(Number(e.target.value));
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // 여기에서 제품 등록 처리 로직을 구현합니다.
    // 제목: title
    // 설명: description
    // 이미지: image
  };

  return (
    <form className="container mx-auto py-8 ">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 h-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[528px] md:mr-8">
            <div className="border-2 h-[792px]">이미지 자리</div>
            <div className="text-center mt-2 ">
              <input
                type="file"
                className="hidden"
                id="mainImage"
                accept="image/*"
              />
              <label
                htmlFor="mainImage"
                className="bg-zinc-100 px-1 py-1 text-gray-600 rounded-lg cursor-pointer hover:text-black hover:font-bold "
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
                        name="bargaining"
                        className="block w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="" disabled>
                          -- 선택 --
                        </option>
                        <option value="yes">가능</option>
                        <option value="no" selected>
                          불가능
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-sm w-1/4">직거래</td>
                    <td>
                      <select
                        name="isMeet"
                        className="block w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="" disabled>
                          -- 선택 --
                        </option>
                        <option value="yes">가능</option>
                        <option value="no" selected>
                          불가능
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-sm w-1/4">지역선택</td>
                    <td>
                      <select
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
                        type="number"
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
            id="description"
            className="resize-none w-full h-[600px] "
          ></textarea>
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
