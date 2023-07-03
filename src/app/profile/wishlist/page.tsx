import WishList from "@/app/components/Wish/WishList";
import { myGetServerSession } from "@/app/lib/getSession";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 찜 목록",
  description: "내가 찜한 제품을 보는 페이지입니다.",
};

export default async function WishListPage() {
  const session = myGetServerSession();
  const email = (await session).user.email;
  const data = await getData(email);

  return <WishList wishData={data} />;
}

async function getData(email: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/get`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );

  const allData = await response.json();

  return allData;
}
