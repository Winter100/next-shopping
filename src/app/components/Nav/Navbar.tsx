"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { available } from "@/app/lib/constants-url";
import Search from "../Pagination/Search";
import UserMenuIcon from "../Menu/UserMenuIcon";

export default function Navbar() {
  const { data } = useSession();

  const linkStyle = " font-bold hover:text-purple-600 ";
  const gridStyle = "flex items-center justify-center my-2 md:my-0 ";

  return (
    <nav className="bg-white border-b-4">
      <div className="bg-indigo-600 h-12 text-white flex items-center justify-center">
        <span className="text-xs md:text-base">
          이 사이트는 상업 목적이 아닌 개인 프로젝트 목적으로 만들어졌습니다
        </span>
      </div>

      <div className="my-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-end space-x-4 text-xs mx-4 md:mx-0">
          {!data ? (
            <>
              <Link href="/auth/in">로그인</Link>
              <Link href="/auth/up">회원가입</Link>
            </>
          ) : (
            <span
              onClick={() => signOut({ callbackUrl: "/" })}
              className={`hover:cursor-pointer`}
            >
              로그아웃
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 my-8">
          <div className={`${gridStyle}`}>
            <Link href="/" className="font-bold text-2xl">
              싹다팜
            </Link>
          </div>
          <div className={`${gridStyle}`}>
            <Search />
          </div>
          <div className={gridStyle}>{data && <UserMenuIcon />}</div>
        </div>

        <div className="flex items-center justify-between mx-6 my-2 md:mx-0 md:my-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className={linkStyle}>
              Home
            </Link>
            <Link href={available} className={linkStyle}>
              상품리스트
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </nav>
  );
}
