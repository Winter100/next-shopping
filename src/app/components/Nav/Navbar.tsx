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
  const gridStyle = "flex items-center justify-center  md:my-0 ";

  // const [scrolling, setScrolling] = useState(false);

  // function handleScroll() {
  //   if (window.scrollY >= 90) {
  //     setScrolling(true);
  //   } else {
  //     setScrolling(false);
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const scrolingStyle = scrolling
  //   ? "fixed top-0 z-30 max-w-4xl bg-white w-full "
  //   : "";

  return (
    <div className=" relative">
      <nav className="bg-white border-b w-full ">
        <div className="bg-indigo-600 h-12 text-white flex items-center justify-center">
          <span className="text-xs md:text-base">
            이 사이트는 상업 목적이 아닌 개인 프로젝트 목적으로 만들어졌습니다
          </span>
        </div>

        <div className="my-1 md:my-2 max-w-4xl mx-auto sticky top-0 z-30">
          <div className="flex items-center justify-end space-x-4 text-xs mx-4 md:mx-0">
            {!data ? (
              <>
                <Link href="/auth/in">로그인</Link>
                <Link href="/auth/up">회원가입</Link>
              </>
            ) : (
              <div>
                <span className=" mr-2 font-bold">{`${data.user.name}`}</span>
                <span
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={`hover:cursor-pointer `}
                >
                  로그아웃
                </span>
              </div>
            )}
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-3 gap-x-4 my-0 md:my-4 h-full">
            <div className={`${gridStyle} my-2`}>
              <Link href="/" className="font-bold text-2xl">
                싹다팜
              </Link>
            </div>
            <div className={`${gridStyle} sticky top-0 z-30 bg-white`}>
              <Search />
            </div>
            <div className={`${gridStyle} my-2`}>
              {data && <UserMenuIcon />}
            </div>
          </div>

          <div className="flex items-center justify-center my-0 md:my-4">
            <div className="flex justify-center items-center space-x-8">
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
    </div>
  );
}
