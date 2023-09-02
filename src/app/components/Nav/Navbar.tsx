"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import LoginNav from "./LoginNav";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data } = useSession();

  function handleDropdownToggle() {
    if (data) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  }

  function handlerCloseMenu() {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  }

  return (
    <nav className="bg-gray-800 w-full fixed z-20" onClick={handlerCloseMenu}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* <img className="h-8 w-8" src="logo.png" alt="Logo" /> */}
            </div>
            <div>
              <div className="ml-4 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/product/search?keyword=all&page=1"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  상품리스트
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                {data && (
                  <button
                    onClick={handleDropdownToggle}
                    className="hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none bg-cyan-600"
                  >
                    Menu
                  </button>
                )}
                {data && isDropdownOpen && <LoginNav />}
              </div>
              {!data && (
                <Link
                  href={"/auth/in"}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
