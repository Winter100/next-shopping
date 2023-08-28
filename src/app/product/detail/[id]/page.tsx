import ProductDetail from "@/app/components/Product/ProductDetail";
import { ProductsType } from "@/app/type/type";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = encodeURIComponent(params.id);

  const { detailData } = await getData(id);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {detailData._id === id ? (
        <ProductDetail data={detailData} />
      ) : (
        <p className="m-auto text-center text-2xl font-bold">
          존재하지 않는 제품입니다.
        </p>
      )}
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
