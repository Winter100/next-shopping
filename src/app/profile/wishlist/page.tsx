import WishList from "@/app/components/Wish/WishList";
import { myGetServerSession } from "@/app/lib/getSession";

export default async function WishListPage() {
  const session = myGetServerSession();
  const email = (await session).user?.email;
  const data = await getData(email);

  return (
    <div className="m-auto my-20 max-w-2xl px-4 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 border-2 shadow-lg rounded-md">
      <h1 className="text-3xl font-bold my-4 text-center">찜 목록</h1>
      {data?.length >= 1 ? (
        <WishList wishData={data} />
      ) : (
        <div>
          <p className="text-lg text-center text-red-600 text-bold my-8">
            찜한 물건이 없습니다.
          </p>
        </div>
      )}
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
