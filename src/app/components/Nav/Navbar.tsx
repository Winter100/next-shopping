"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { available } from "@/app/lib/constants-url";
import Search from "../Pagination/Search";
import UserMenuIcon from "../Menu/UserMenuIcon";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data } = useSession();
  const pathName = usePathname();
  const isHomeActive = pathName?.includes("/product") ? "text-purple-600" : "";

  const linkStyle = " font-bold hover:text-purple-600 ";
  const gridStyle = "flex items-center justify-center  md:my-0 ";

  const [popUp, setpopUp] = useState(true);
  return (
    <div>
      <nav className="bg-white border-b-2 sm:border-b-4 w-full m-auto">
        {popUp && (
          <div className="bg-indigo-600 h-6 text-white flex items-center justify-center">
            <span className="text-[0.6rem] ">
              이 사이트는 개인 프로젝트 목적으로 만들어졌습니다
            </span>
            <button onClick={() => setpopUp(false)} className=" ml-4 text-xs">
              {"[닫기]"}
            </button>
          </div>
        )}

        <div className="my-1 md:my-2 max-w-4xl mx-auto">
          <div className="flex items-center justify-end space-x-4 text-xs mx-4 md:mx-0">
            {!data ? (
              <>
                <Link href="/auth/in">로그인</Link>
                <Link href="/auth/up">회원가입</Link>
              </>
            ) : (
              <div>
                <Link href={"/profile"}>
                  <span className=" hover:cursor-pointer hover:text-purple-600 mr-2 font-bold">{`${data.user.name}`}</span>
                </Link>
                <span
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={`hover:cursor-pointer hover:text-purple-600 `}
                >
                  로그아웃
                </span>
              </div>
            )}
          </div>

          <div className=" grid grid-cols-3 sm:grid-cols-3 sm:gap-x-4 my-0 sm:my-4 h-full">
            <div className="sm:hidden block"></div>
            <div className={`${gridStyle} my-2 order-2 sm:order-1`}>
              <Link href="/" className="font-bold text-xl  sm:text-2xl">
                싹다팜
              </Link>
            </div>
            <div
              className={`${gridStyle} col-span-3 sm:col-auto w-full block order-3 sm:order-2 `}
            >
              <Search />
            </div>
            <div className={`${gridStyle}  order-2 sm:order-3 `}>
              {data && <UserMenuIcon />}
            </div>
          </div>

          <div className="flex items-center justify-center my-2 sm:my-0">
            <div className="flex justify-center items-center space-x-8 ">
              <Link href={available} className={`${isHomeActive} ${linkStyle}`}>
                상품리스트
              </Link>
            </div>
            <div></div>
          </div>
        </div>
      </nav>
    </div>
  );
}
