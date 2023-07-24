import ProductDetail from "@/app/components/Product/ProductDetail";
import { ProductsType } from "@/app/type/type";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "제품 상세보기",
//   description: "...",
// };

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const { detailData } = await getData(id);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {detailData && <ProductDetail data={detailData} />}
      {!detailData && <p>존재하지 않는 제품입니다.</p>}
    </div>
  );
}

async function getData(
  detailId: string
): Promise<{ detailData: ProductsType }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailproducts/${detailId}`,
    {
      method: "POST",
      cache: "no-store",
    }
  );

  const { detailData } = await response.json();

  return { detailData };
}
