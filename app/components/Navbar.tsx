import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/add"}>상품올리기</Link>
        </li>
      </ul>
    </nav>
  );
}
