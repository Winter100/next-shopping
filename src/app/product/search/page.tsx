import Filters from "@/app/components/Pagination/Filters";
import Pagination from "@/app/components/Pagination/Pagination";
import ProductList from "@/app/components/Product/ProductList";
import { PageInfoProps, ProductsType } from "@/app/type/type";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { keyword?: string; page: number; filter: string };
}) {
  const keyword = searchParams?.keyword;
  const pageNumber = Number(searchParams?.page);
  const filterValue = searchParams?.filter;

  const data = await getData(keyword, pageNumber, filterValue);
  const searchData: ProductsType[] = await data?.searchData;
  const pageInfo: PageInfoProps = await data?.pageInfo;

  const dataLength = data.searchData?.length;

  return (
    <div className="flex flex-col items-center justify-center">
      <Pagination pageInfo={pageInfo} dataLength={dataLength} />
      <div className="flex items-center justify-end">
        <Filters pageInfo={pageInfo} />
      </div>
      {dataLength >= 1 ? (
        <ProductList products={searchData} pageInfo={pageInfo} />
      ) : (
        <div className="mx-auto my-8">
          <span>등록된 상품이 없습니다.</span>
        </div>
      )}
    </div>
  );
}

async function getData(keyword: string, page: number, filterValue: string) {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${encodedKeyword}/${page}/${filterValue}`,
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
  } catch (e) {
    console.log(e);
  }
}
