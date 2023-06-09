import DetailProductsData from "@/app/api/[detailproducts]/route";
import ProductDetail from "@/app/components/Product/ProductDetail";
import TestProductDetail from "@/app/components/Product/testProductDetail";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const data = await DetailProductsData(id);

  return (
    <div>
      <ProductDetail data={data} />
      {/* <TestProductDetail /> */}
    </div>
  );
}
