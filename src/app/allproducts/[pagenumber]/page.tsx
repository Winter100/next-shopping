import Pagination from "@/app/components/Pagination/Pagination";
import Search from "@/app/components/Pagination/Search";
import ProductList from "@/app/components/Product/ProductList";
import { ProductsType } from "@/app/type/type";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "모든 제품 보기",
//   description: "판매를 위해 등록한 모든 제품",
// };

interface ParamsType {
  params: { pagenumber: number };
}

export default async function AllProductsPage({ params }: ParamsType) {
  const pageNumber = Number(params.pagenumber);

  const allData = await getData(pageNumber);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {allData && <ProductList products={allData} />}
      {allData.length <= 0 && <p>등록된 제품이 없습니다.</p>}
      <Search />
      <Pagination />
    </div>
  );
}

async function getData(page: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/allproducts/${page}`,
    {
      cache: "no-store",
      method: "GET",
    }
  );

  const allData: ProductsType[] = await response.json();

  return allData;
}
