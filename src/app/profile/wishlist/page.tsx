import WishList from "@/src/app/components/Wish/WishList";
import { myGetServerSession } from "@/src/app/lib/getSession";

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
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );

  const allData = await response.json();

  return allData;
}
