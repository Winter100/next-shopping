import WishList from "@/app/_components/Wish/WishList";
import { myGetServerSession } from "@/app/_lib/getSession";

export default async function WishListPage() {
  const session = await myGetServerSession();

  const { email } = session?.user;

  return (
    <div>
      <WishList email={email} />
    </div>
  );
}
