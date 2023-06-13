import GET from "../api/allproducts/route";
import ProductList from "../components/Product/ProductList";

export default async function AllProductsPage() {
  const data: any = await GET();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data && <ProductList products={data} />}
    </main>
  );
}
