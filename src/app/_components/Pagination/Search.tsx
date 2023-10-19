"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams?.get("filter") || "available";

  const [searchTerm, setSearchTerm] = useState("");

  let isSubmitting = false;

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isSubmitting) {
      setTimeout(() => handleSubmit(e), 200);
      return;
    }

    isSubmitting = true;

    const inputValue = searchTerm.replace(/(\s*)/g, "");

    if (inputValue.length < 1) {
      router.push(
        `/product/search?keyword=all&page=${1}&filter=${filter || "available"}`
      );
    }
    router.push(
      `/product/search?keyword=${inputValue}&page=${1}&filter=${
        filter || "available"
      }`
    );
  }

  return (
    <div className=" w-72 m-auto border rounded-lg border-indigo-600 h-12">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center border-none h-full"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="검색어를 입력해주세요"
          className="p-2 text-sm w-full border-none"
          style={{ outline: "none", boxShadow: "none" }}
        />
        <button className="w-8 m-auto focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
