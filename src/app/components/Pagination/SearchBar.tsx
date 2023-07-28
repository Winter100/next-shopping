"use client";

import { PaginationProps } from "@/app/type/type";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar({ setCurrentPage }: PaginationProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const inputValue = searchTerm.replace(/(\s*)/g, "");

    if (inputValue.length < 1) {
      //검색 입력 단어가 0자 일때
      return;
    }

    // return router.push(`/product/search?keyword=${inputValue}`);

    setCurrentPage(1);
    return router.push(`/product/search?keyword=${inputValue}&page=${1}`);
  }

  return (
    <div className="my-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-2 w-full rounded-md"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
          className="py-2 px-4 sm:text-sm border-none rounded-md"
        />
        <button className="w-8">
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
