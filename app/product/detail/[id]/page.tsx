import DetailProductsData from "@/app/api/detailproducts/route";
import ProductDetail from "@/app/components/Product/ProductDetail";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const data = await DetailProductsData(id);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {data && <ProductDetail data={data} />}
      {!data && <p>존재 하지 않는 제품입니다.</p>}
    </div>
  );
}
