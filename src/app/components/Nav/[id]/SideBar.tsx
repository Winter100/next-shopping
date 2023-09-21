"use client";
import Image from "next/image";
import userIcon from "../../../../public/Menu/user.svg";
import WishListIcon from "../../../../public/Menu/heart.svg";
import dollarIcon from "../../../../public/Menu/dollar-sign.svg";
import editIcon from "../../../../public/Menu/edit.svg";
import Link from "next/link";

export default function SideBar() {
  const spanStyle = "ml-3 ";
  return (
    <aside id="sidebar-multi-level-sidebar" aria-label="Sidebar">
      <div className="h-full px-3 overflow-y-auto ">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/profile"
              className=" relative flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Image src={userIcon} alt="My Page" />
              <span className={spanStyle}>프로필</span>
            </Link>
          </li>
          <li>
            <Link
              href="/newproduct"
              className=" relative flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Image src={editIcon} alt="AddProductIcon" />
              <span className={spanStyle}>상품등록</span>
            </Link>
          </li>
          <li>
            <Link
              href="/profile/myproducts"
              className=" relative flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Image src={dollarIcon} alt="SalesIcon" />
              <span className={spanStyle}>판매목록</span>
            </Link>
          </li>

          <li>
            <Link
              href="/profile/wishlist"
              className=" relative flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
