import Pagination from "@/app/components/Pagination/Pagination";
import Search from "@/app/components/Pagination/Search";
import ProductList from "@/app/components/Product/ProductList";
import { ProductsType } from "@/app/type/type";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { keyword?: string };
}) {
  const encodeUrl = encodeURIComponent(searchParams.keyword);
  const decodeUrl = decodeURIComponent(encodeUrl);
  // const keyword = searchParams.keyword && searchParams.keyword;
  const keyword = decodeUrl;

  console.log("keyword", keyword);

  const searchData = await getData(keyword);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {searchData && <ProductList products={searchData} />}
      {!searchData && <p>결과가 없습니다.</p>}
      <Search />
      <Pagination />
    </div>
  );
}

async function getData(keyword: string = "") {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${keyword}`,
    {
      cache: "no-store",
      method: "POST",
    }
  );

  const searchData: ProductsType[] = await response.json();

  return searchData;
}
