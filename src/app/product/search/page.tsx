import Pagination from "@/app/components/Pagination/Pagination";
import ProductList from "@/app/components/Product/ProductList";
import { PageInfoProps, ProductsType } from "@/app/type/type";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { keyword?: string; page: number };
}) {
  const keyword = searchParams?.keyword;
  const pageNumber = Number(searchParams?.page);

  const data = await getData(keyword, pageNumber);
  const searchData: ProductsType[] = await data?.searchData;
  const pageInfo: PageInfoProps = await data?.pageInfo;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {searchData?.length >= 1 ? (
        <ProductList products={searchData} />
      ) : (
        <div className="m-auto">
          <span>등록된 상품이 없습니다.</span>
        </div>
      )}
      <Pagination pageInfo={pageInfo} />
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

  const result = await response.json();
  const data = {
    searchData: result.transData,
    pageInfo: result.pageInfo,
  };

  return data;
}
