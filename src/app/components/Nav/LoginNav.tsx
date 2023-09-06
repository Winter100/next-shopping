"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function LoginNav() {
  async function singoutHandler() {
    await signOut({ callbackUrl: "/" });
  }

  const divClassName = "py-1";
  const linkClassName =
    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100";
  return (
    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg">
      <div className={divClassName}>
        <Link href="/profile" className={linkClassName}>
          My Page
        </Link>
        <Link href="/profile/wishlist" className={linkClassName}>
          찜 목록
        </Link>
      </div>
      <div className={divClassName}>
        <Link href="/newproduct" className={linkClassName}>
          물건 팔기
        </Link>
        <Link href="/profile/myproducts" className={linkClassName}>
          내 판매 목록
        </Link>
      </div>
      <div className={divClassName}>
        <span
          onClick={singoutHandler}
          className={`${linkClassName} hover:cursor-pointer`}
        >
          로그아웃
        </span>
      </div>
    </div>
  );
}
