import { getServerSession } from "next-auth";
import ProductList from "./components/ProductList";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductList />
      <p>{JSON.stringify(session)}</p>
    </main>
  );
}

//데이터 받아서 프로덕트 리스트에 넘겨주기
