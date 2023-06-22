import AddProcuct from "../components/Product/Addproduct";
import { myGetServerSession } from "../lib/getSession";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "제품 판매",
  description: "판매자가 판매할 제품을 등록하기 위한 페이지",
};

export default async function NewproductPage() {
  const session = await myGetServerSession();

  return (
    <div>
      <AddProcuct editData={null} method="POST" />;
    </div>
  );
}
