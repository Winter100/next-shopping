"use client";

import { PageInfoProps } from "@/app/type/type";
import { Option, Select } from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filters({ pageInfo }: { pageInfo: PageInfoProps }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const searchKeyword = searchParams?.get("keyword");
  // const pageNum = Number(searchParams?.get("page"));
  const filterValue = searchParams?.get("filter");

  const handleFilterChange = (e: string) => {
    const selectedFilter = e;

    if (selectedFilter === "completed") {
      router.push(
        `/product/search?keyword=${searchKeyword}&page=1&filter=completed`
      );
    } else if (selectedFilter === "available") {
      router.push(
        `/product/search?keyword=${searchKeyword}&page=1&filter=available`
      );
    } else if (selectedFilter === "lowprice") {
      router.push(
        `/product/search?keyword=${searchKeyword}&page=1&filter=lowprice`
      );
    } else if (selectedFilter === "highprice") {
      router.push(
        `/product/search?keyword=${searchKeyword}&page=1&filter=highprice`
      );
    }

    return;
  };

  return (
    <div className="font-sans w-auto text-sm flex items-center justify-end z-20">
      <div>{pageInfo?.totalItems} 개의 상품</div>
      <div className="z-10 text-center">
        <Select
          label="filter"
          onChange={handleFilterChange}
          value={filterValue || "available"}
        >
          <Option value="available">거래가능</Option>
          <Option value="completed">거래완료</Option>
          <Option value="lowprice">낮은가격순</Option>
          <Option value="highprice">높은가격순</Option>
        </Select>
      </div>
    </div>
  );
}
