import MyProductsList from "@/app/components/Product/MyProductsList";

import { myGetServerSession } from "@/app/lib/getSession";
import { ProductsType } from "@/app/type/type";

export default async function MyProductsPage() {
  const session = await myGetServerSession();

  const { email, name } = session.user;
  const data = await getData(email, name);

  return (
    <div className="m-auto my-20 max-w-2xl px-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 border-2 shadow-lg rounded-md">
      {data?.length > 0 ? (
        <MyProductsList products={data} />
      ) : (
        <p className="text-gray-600 text-lg">등록된 제품이 없습니다.</p>
      )}
    </div>
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
