import GetMyProductItems from "@/app/api/myproducts/route";
import MyProductsList from "@/app/components/Product/MyProductsList";
import { myGetServerSession } from "@/lib/getSession";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "내가 올린 제품 목록",
  description: "사용자가 판매를 위해 등록한 제품의 목록",
};

export default async function MyProductsPage() {
  const session = await myGetServerSession();

  const data: any = await GetMyProductItems();

  return <MyProductsList products={data} />;
}
