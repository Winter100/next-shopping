import MyProductsList from "@/app/components/Product/MyProductsList";

import { myGetServerSession } from "@/app/lib/getSession";
import { ProductsType } from "@/app/type/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "내가 올린 제품 목록",
  description: "사용자가 판매를 위해 등록한 제품의 목록",
};

export default async function MyProductsPage() {
  const session = await myGetServerSession();

  const { email, name } = session.user;
  const data = await getData(email, name);

  return (
    <>
      {data ? (
        <MyProductsList products={data} />
      ) : (
        <p className="text-gray-600 text-lg">등록된 물건이 없습니다.123</p>
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
