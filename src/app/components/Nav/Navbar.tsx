"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { available } from "@/app/lib/constants-url";
import Search from "../Pagination/Search";
import UserMenuIcon from "../Menu/UserMenuIcon";

export default function Navbar() {
  const { data } = useSession();

  const linkStyle = " font-bold hover:text-purple-600";
  const LinkDivStyle = "flex items-center justify-center ";

  return (
    <nav className="w-full h-full bg-white z-50 m-auto border-b-4">
      <div className="w-full flex items-center justify-center text-sm bg-indigo-600 h-12 text-white m-auto">
        <span>
          이 사이트는 상업 목적이 아닌 개인 프로젝트 목적으로 만들어졌습니다
        </span>
      </div>
      <div className="my-4 m-auto w-full max-w-4xl ">
        <div className="flex items-center justify-end space-x-4 text-xs">
          {!data ? (
            <>
              <Link href={"/auth/in"}>로그인</Link>
              <Link href={"/auth/up"}>회원가입</Link>
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
        <div className="m-auto grid grid-cols-3 gap-x-4 my-8">
          <div className={LinkDivStyle}>
            <Link href={"/"} className="font-bold text-2xl">
              싹다팜
            </Link>
          </div>
          <Search />
          <div className={LinkDivStyle}>{data && <UserMenuIcon />}</div>
        </div>

        <div className="flex items-center justify-between h-8 my-8">
          <div className="flex items-center justify-center space-x-16 ">
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
