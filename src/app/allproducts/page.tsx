import ProductList from "../components/Product/ProductList";
import { ProductsType } from "../type/type";
import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "모든 제품 보기",
  description: "판매를 위해 등록한 모든 제품",
};

async function getAllProduct() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/allproducts`
  );
  const allProducts = (await res.json()) as ProductsType[];
  return allProducts;
}

export default async function AllProductsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["all-product"], getAllProduct);
  const dehydratedState = dehydrate(queryClient);
  // const allData = await getData();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hydrate state={dehydratedState}>
        <ProductList />
      </Hydrate>
      {/* {allData && <ProductList products={allData} />}
      {!allData && <p>등록된 제품이 없습니다.</p>} */}
    </div>
  );
}

// async function getData() {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/allproducts`,
//     {
//       cache: "no-store",
//       method: "GET",
//     }
//   );

//   const allData: ProductsType[] = await response.json();

//   return allData;
// }
