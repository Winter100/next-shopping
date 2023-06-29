import Link from "next/link";
import { User } from "./components/user-components";
import Pagination from "./components/Pagination/Pagination";

export default function Home() {
  return (
    <>
      <h1>Hello, Next.js 13 App Directory!</h1>
      <p>
        <Link href="/initial-data">Prefetching Using initial data</Link>
      </p>
      <p>
        <Link href="/hydration">Prefetching Using Hydration</Link>
      </p>
      <User />
      <Pagination />
    </>
  );
}
