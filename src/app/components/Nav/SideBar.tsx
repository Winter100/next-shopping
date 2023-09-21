"use client";
import Image from "next/image";
import userIcon from "../../../../public/Menu/user.svg";
import WishListIcon from "../../../../public/Menu/heart.svg";
import dollarIcon from "../../../../public/Menu/dollar-sign.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const spanStyle = "ml-3 ";

  const pathname = usePathname();

  const linkStyle = `relative flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`;

  return (
    <aside id="sidebar-multi-level-sidebar" aria-label="Sidebar">
      <div className="h-full px-3 overflow-y-auto ">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/profile"
              className={`${linkStyle} ${
                pathname === "/profile" && "bg-blue-gray-50"
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
                pathname === "/profile/myproducts" && "bg-blue-gray-50"
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
                pathname === "/profile/wishlist" && "bg-blue-gray-50"
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
