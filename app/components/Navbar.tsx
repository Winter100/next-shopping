import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-900">
      <ul className="flex items-center justify-around mx-auto py-6 px-8 max-w-7xl">
        <li>
          <Link
            className="text-white text-lg font-medium hover:text-gray-300"
            href={"/"}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            className="text-white text-lg font-medium hover:text-gray-300"
            href={"/newproduct"}
          >
            등록하기
          </Link>
        </li>

        <li>
          <Link
            className="text-white text-lg font-medium hover:text-gray-300"
            href={"/auth/in"}
          >
            로그인
          </Link>
        </li>
      </ul>
    </nav>
  );
}
