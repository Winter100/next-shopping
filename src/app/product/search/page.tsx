import Pagination from "@/app/components/Pagination/Pagination";
import ProductList from "@/app/components/Product/ProductList";
import { ProductsType } from "@/app/type/type";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { keyword?: string; page: number };
}) {
  const keyword = searchParams.keyword;
  const pageNumber = Number(searchParams.page);

  const searchData = await getData(keyword, pageNumber);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {searchData?.length > 1 ? (
        <ProductList products={searchData} />
      ) : (
        <p className=" mt-56">결과가 없습니다.</p>
      )}
      <Pagination />
    </div>
  );
}

async function getData(keyword: string, page: number) {
  const encodedKeyword = encodeURIComponent(keyword);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${encodedKeyword}/${page}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const searchData: ProductsType[] = await response.json();

  return searchData;
}
