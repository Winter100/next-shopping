import { Metadata } from "next";
import Link from "next/link";
import { MultiUploader } from "./components/Images/Upload-Test";

export const metadata: Metadata = {
  title: "싹다팜의 HomePage",
  description: "...",
};

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
      <MultiUploader />
    </>
  );
}
