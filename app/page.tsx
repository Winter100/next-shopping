import ProductList from "./components/ProductList";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductList />
    </main>
  );
}

//데이터 받아서 프로덕트 리스트에 넘겨주기
