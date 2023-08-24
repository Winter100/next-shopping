import WishList from "@/app/components/Wish/WishList";
import { myGetServerSession } from "@/app/lib/getSession";

export default async function WishListPage() {
  const session = myGetServerSession();
  const email = (await session).user?.email;
  const data = await getData(email);

  return (
    <div className="m-auto my-20 max-w-2xl px-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 border-2 shadow-lg rounded-md">
      {data ? <WishList wishData={data} /> : <p>찜한 제품이 없습니다.</p>}
    </div>
  );
}

async function getData(email: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/get`,
    {
      cache: "no-cache",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );

  const allData = await response.json();

  return allData;
}
