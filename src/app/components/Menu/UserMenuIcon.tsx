import Image from "next/image";
import addProductIcon from "../../../../public/Menu/edit.svg";
import userIcon from "../../../../public/Menu/user.svg";
import wishIcon from "../../../../public/Menu/heart.svg";
import salesIcon from "../../../../public/Menu/dollar-sign.svg";
import Link from "next/link";

export default function UserMenuIcon() {
  const iconHeight = 25;
  return (
    <ul className="flex items-center justify-center space-x-7 m-auto">
      <li>
        <Link href="/newproduct">
          <Image
            src={addProductIcon}
            alt="AddProductIcon"
            height={iconHeight}
            title="상품등록"
          />
        </Link>
      </li>
      <li>
        <Link href="/profile/myproducts">
          <Image
            src={salesIcon}
            alt="salesIcon"
            height={iconHeight}
            title="내 판매목록"
          />
        </Link>
      </li>
      <li>
        <Link href="/profile/wishlist">
          <Image
            src={wishIcon}
            alt="WishIcon"
            height={iconHeight}
            title="찜 목록"
          />
        </Link>
      </li>
      <li>
        <Link href="/profile">
          <Image
            src={userIcon}
            alt="UserIcon"
            height={iconHeight}
            title="프로필"
          />
        </Link>
      </li>
    </ul>
  );
}
