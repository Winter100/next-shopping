import Pagination from "@/app/components/Pagination/Pagination";
import ProductList from "@/app/components/Product/ProductList";
import { ProductsType } from "@/app/type/type";
// import getQueryClient from "@/utils/getQueryClient";
// import Hydrate from "@/utils/hydrate.client";
// import { dehydrate } from "@tanstack/query-core";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "모든 제품 보기",
  description: "판매를 위해 등록한 모든 제품",
};

// async function getAllProduct() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/allproducts`
//   );
//   const allProducts = (await res.json()) as ProductsType[];
//   return allProducts;
// }

interface ParamsType {
  params: { pagenumber: number };
}

export default async function AllProductsPage({ params }: ParamsType) {
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(["all-product"], getAllProduct, {
  //   staleTime: 1000,
  // });
  // const dehydratedState = dehydrate(queryClient);
  const pageNumber = Number(params.pagenumber);

  const allData = await getData(pageNumber);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {/* <Hydrate state={dehydratedState}>
        <ProductList />
      </Hydrate> */}
      {allData && <ProductList products={allData} />}
      {!allData && <p>등록된 제품이 없습니다.</p>}
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
