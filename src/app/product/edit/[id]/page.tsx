import { redirect } from "next/navigation";

import { Metadata } from "next";
import { myGetServerSession } from "@/app/lib/getSession";
import AddProcuct from "@/app/components/Product/Addproduct";
import { ProductsType } from "@/app/type/type";

export const metadata: Metadata = {
  title: "수정 페이지",
  description: "사용자가 올린 제품의 내용을 수정하는 페이지입니다.",
};

export default async function EditProductsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await myGetServerSession();

  const id = params.id;
  const data = await getData(id);

  if (session.user.email !== data.email) {
    redirect("/");
  }

  return <AddProcuct editData={data} method="PATCH" />;
}

async function getData(detailId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailproducts`,
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(detailId),
    }
  );

  const data: ProductsType = await response.json();

  return data;
}
