import WishList from "@/app/_components/Wish/WishList";
import { myGetServerSession } from "@/app/_lib/getSession";

export default async function WishListPage() {
  const session = await myGetServerSession();

  const { email } = session?.user;

  return (
    <div>
      <h1 className="text-2xl my-2 font-bold text-center">찜 목록</h1>
      <WishList email={email} />
    </div>
  );
}
