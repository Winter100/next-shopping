import ProductList from "../components/Product/ProductList";
import { ProductsType } from "../type/type";

export default async function AllProductsPage() {
  const allData = await getData();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {allData && <ProductList products={allData} />}
      {!allData && <p>등록된 제품이 없습니다.</p>}
    </div>
  );
}

async function getData() {
  const response = await fetch("http://localhost:3000/api/allproducts", {
    cache: "no-store",
    method: "GET",
  });

  const allData: ProductsType[] = await response.json();

  return allData;
}