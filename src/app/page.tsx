import Link from "next/link";
import { User } from "./components/user-components";
import NoteForm from "./components/Note/SendNote";

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
      <NoteForm />
    </>
  );
}
