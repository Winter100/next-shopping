"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function LoginNav() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: `/` });
  };
  return (
    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg">
      <div className="py-1">
        <Link
          href="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          My Page
        </Link>
        <Link
          href="/profile/wishlist"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          찜 목록
        </Link>
      </div>
      <div className="py-1">
        <Link
          href="/newproduct"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          물건 팔기
        </Link>
        <Link
          href="/profile/myproducts"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          내 판매 목록
        </Link>
      </div>
      <div className="py-2">
        <span
          onClick={handleLogout}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
        >
          로그아웃
        </span>
      </div>
    </div>
  );
}
