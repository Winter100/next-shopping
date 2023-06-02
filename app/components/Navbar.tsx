"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useSession();

  console.log("asdf", data);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: `/` });
  };

  const handlerCloseMenu = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  const handleSearch = () => {
    // 검색 로직 구현
    console.log("Search query:", searchQuery);
    setSearchQuery("");
  };

  return (
    <nav className="bg-gray-800" onClick={handlerCloseMenu}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* <img className="h-8 w-8" src="logo.png" alt="Logo" /> */}
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                {data && (
                  <button
                    onClick={handleDropdownToggle}
                    className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                  >
                    Menu
                  </button>
                )}
                {data && isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg">
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Page
                      </Link>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/newproduct"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        제품 올리기
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              {!data ? (
                <Link
                  href={"/auth/in"}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                >
                  로그인
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 focus:outline-none"
                >
                  로그아웃
                </button>
              )}
              <div className="ml-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 bg-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-0 top-0 mt-2 mr-3 flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.5 13h-.79l-.28-.27A6.47 6.47 0 0016 6.5 6.5 6.5 0 103.5 13c1.42 0 2.74-.47 3.8-1.27l.27.28v.79l4 4L18 17l-4-4zm-8 0a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
