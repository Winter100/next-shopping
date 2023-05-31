"use client";
import React, { useState } from "react";

export default function AddProcuct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  function handleSubmit() {
    // 제품 등록 로직을 처리하는 코드를 추가하세요
    console.log("제품 등록:", productName, productPrice, productDescription);
    // ...
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md bg-white rounded-lg shadow-md p-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-2xl font-bold mb-6">제품 등록</h2>
        <div className="mb-6">
          <label
            htmlFor="productName"
            className="block text-gray-700 font-medium mb-2"
          >
            제품명
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="productPrice"
            className="block text-gray-700 font-medium mb-2"
          >
            가격
          </label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="productDescription"
            className="block text-gray-700 font-medium mb-2"
          >
            설명
          </label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600"
        >
          등록
        </button>
      </form>
    </div>
  );
}
