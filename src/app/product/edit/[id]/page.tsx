import { redirect } from "next/navigation";

import { Metadata } from "next";
import { myGetServerSession } from "@/app/lib/getSession";
import AddProcuct from "@/app/components/Product/Addproduct";
import { ProductsType } from "@/app/type/type";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

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

  if (session.user.email !== data.detailData.email) {
    redirect("/");
  }

  return <AddProcuct editData={data.detailData} method="PATCH" />;
}

async function getData(
  detailId: string
): Promise<{ detailData: ProductsType; iswish: boolean }> {
  const session = await getServerSession(authOptions);

  let email = "";
  if (session?.user?.email) {
    email = session.user.email;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailproducts/${detailId}`,
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  const { detailData, iswish } = await response.json();

  return { detailData, iswish };
}

// async function getData(detailId: string) {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailproducts/${detailId}`,
//     {
//       cache: "no-store",
//       method: "POST",
//     }
//   );

//   const { detailData }: { detailData: ProductsType } = await response.json();

//   return detailData;
// }
