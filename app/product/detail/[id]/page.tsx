import ProductDetail from "@/app/components/Product/ProductDetail";
import { ProductsType } from "@/app/type/type";

import { Metadata } from "next";

//동적으로 수정하기?
export const metadata: Metadata = {
  title: "제품 상세보기",
  description: "...",
};

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const detailData = await getData(id);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {detailData && <ProductDetail data={detailData} />}
      {!detailData && <p>존재 하지 않는 제품입니다.</p>}
    </div>
  );
}

async function getData(detailId: string) {
  //최종 배포시 "http://localhost:3000"와 실제 배포주소 .env에 담아 process.env if문으로 분기해 관리하기
  const response = await fetch("http://localhost:3000/api/detailproducts", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(detailId),
  });

  const data: ProductsType = await response.json();

  return data;
}
