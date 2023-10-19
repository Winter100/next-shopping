import Link from "next/link";
import AddProductIcon from "./AddProductIcon";
import UserIcon from "./UserIcon";

export default function UserMenuIcon() {
  return (
    <ul className="flex items-center justify-center space-x-4 sm:space-x-7 m-auto">
      <li>
        <Link href="/newproduct">
          <AddProductIcon />
        </Link>
      </li>
      <li>
        <Link href="/profile">
          <UserIcon />
        </Link>
      </li>
    </ul>
  );
}
