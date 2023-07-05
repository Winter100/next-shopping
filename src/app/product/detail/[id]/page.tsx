import ProductDetail from "@/app/components/Product/ProductDetail";
import { authOptions } from "@/app/lib/auth";
import { ProductsType } from "@/app/type/type";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

//동적으로 수정하기?
export const metadata: Metadata = {
  title: "제품 상세보기",
  description: "...",
};

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const { detailData, iswish } = await getData(id);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {detailData && <ProductDetail data={detailData} iswish={iswish} />}
      {!detailData && <p>존재 하지 않는 제품입니다.</p>}
    </div>
  );
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
