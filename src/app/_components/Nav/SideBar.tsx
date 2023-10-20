"use client";
import Image from "next/image";
import userIcon from "../../../../public/Menu/user.svg";
import WishListIcon from "../../../../public/Menu/heart.svg";
import dollarIcon from "../../../../public/Menu/dollar-sign.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const spanStyle = "m-auto";

  const pathname = usePathname();

  const linkStyle = ` relative h-14 md:h-12 text-sm flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`;
  const mobileLiStyle = "fixed bottom-0 md:relative z-10 w-full bg-white";
  const linkTextStyle = "bg-blue-gray-50 text-purple-600";
  return (
    <aside id=" sidebar-multi-level-sidebar" aria-label="Sidebar">
      <div className=" md:bg-none md:h-full   md:px-3 md:overflow-y-auto ">
        <ul
          className={`${mobileLiStyle} text-center gap-0 sm:gap-2 grid grid-cols-3 md:grid-cols-none md:font-medium`}
        >
          <li className=" font-bold text-2xl hidden sm:block  ">My Page</li>
          <li>
            <Link
              href="/profile"
              className={`${linkStyle} ${
                pathname === "/profile" && linkTextStyle
              }`}
            >
              <Image src={userIcon} alt="My Page" />
              <span className={spanStyle}>프로필</span>
            </Link>
          </li>
          <li>
            <Link
              href="/profile/myproducts"
              className={`${linkStyle} ${
                pathname === "/profile/myproducts" && linkTextStyle
              }`}
            >
              <Image src={dollarIcon} alt="SalesIcon" />
              <span className={spanStyle}>판매목록</span>
            </Link>
          </li>

          <li>
            <Link
              href="/profile/wishlist"
              className={`${linkStyle} ${
                pathname === "/profile/wishlist" && linkTextStyle
              }`}
            >
              <Image src={WishListIcon} alt="WishList" />
              <span className={spanStyle}>찜 목록</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
