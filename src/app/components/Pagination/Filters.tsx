"use client";

import { PageInfoProps } from "@/app/type/type";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filters({ pageInfo }: { pageInfo: PageInfoProps }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const searchKeyword = searchParams?.get("keyword");
  const pageNum = Number(searchParams?.get("page"));
  const filterValue = searchParams?.get("filter");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;

    if (selectedFilter === "completed") {
      router.push(
        `/product/search?keyword=${searchKeyword}&page=1&filter=completed`
      );
    } else if (selectedFilter === "available") {
      router.push(
        `/product/search?keyword=${searchKeyword}&page=1&filter=available`
      );
      // } else if (selectedFilter === "lowprice") {
      //   router.push("/product/search?keyword=all&page=1&filter=lowprice");
      // } else if (selectedFilter === "highprice") {
      //   router.push("/product/search?keyword=all&page=1&filter=highprice");
    }

    return;
  };

  return (
    <div className="font-sans w-auto text-sm flex items-center justify-end">
      <div>{pageInfo?.totalItems} 개의 상품</div>
      <div className="z-10 text-center">
        <select
          name="filter"
          onChange={handleFilterChange}
          value={searchParams?.get("filter") || ""}
        >
          <option value="available">거래가능</option>
          <option value="completed">거래완료</option>
        </select>
      </div>
    </div>
  );
}
