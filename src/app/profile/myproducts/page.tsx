import MyProductsList from "@/app/components/Product/MyProductsList";

import { myGetServerSession } from "@/app/lib/getSession";
import { ProductsType } from "@/app/type/type";

export default async function MyProductsPage() {
  const session = await myGetServerSession();

  const { email, name } = session.user;
  const data = await getData(email, name);

  return (
    <>
      {data ? (
        <MyProductsList products={data} />
      ) : (
        <p className="text-gray-600 text-lg">등록된 제품이 없습니다.</p>
      )}
    </>
  );
}

async function getData(email: string, name: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/myproducts`,
    {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    }
  );

  const myProductsData: ProductsType[] = await response.json();

  return myProductsData;
}
