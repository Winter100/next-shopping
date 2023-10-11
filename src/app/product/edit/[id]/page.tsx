import { redirect } from "next/navigation";

import { myGetServerSession } from "@/app/lib/getSession";
import AddProcuct from "@/app/components/Product/Addproduct";
import { ProductsType } from "@/app/type/type";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

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

  return data ? (
    <AddProcuct editData={data.detailData} method="PATCH" />
  ) : (
    <p className="m-auto flex items-center justify-center text-2xl font-bold w-80 h-80">
      존재하지 않는 제품입니다.
    </p>
  );
}

async function getData(
  detailId: string
): Promise<{ detailData: ProductsType }> {
  const session = await getServerSession(authOptions);

  let email = "";
  if (session?.user?.email) {
    email = session.user.email;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailproducts/${detailId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        cache: "no-store",
      }
    );

    const { detailData } = await response.json();

    return { detailData };
  } catch (e) {
    return;
  }
}
