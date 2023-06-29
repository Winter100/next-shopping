"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;
  const maxDisplayedPages = 5;
  const halfDisplayedPages = Math.floor(maxDisplayedPages / 2);

  const router = useRouter();

  async function handleClick(pageNumber: number) {
    router.push(`/allproducts/${pageNumber}`);
    setCurrentPage(pageNumber);
  }

  if (currentPage < 1) {
    setCurrentPage(1);
  } else if (currentPage > 100) {
    setCurrentPage(100);
  }

  function renderPageNumbers() {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - halfDisplayedPages);
    let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);
    startPage = Math.max(1, endPage - maxDisplayedPages + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <div
            className={`px-3 py-2 leading-tight hover:cursor-pointer ${
              i === currentPage
                ? "text-blue-600 bg-blue-50"
                : "text-gray-500 bg-white"
            } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={() => handleClick(i)}
          >
            {i}
          </div>
        </li>
      );
    }

    return pageNumbers;
  }

  return (
    <nav aria-label="Page navigation example">
      {currentPage}
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#"
            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              onClick={() => setCurrentPage((pre) => pre - 1)}
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        {renderPageNumbers()}
        <li>
          <a
            href="#"
            className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              onClick={() => setCurrentPage((pre) => pre + 1)}
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}
