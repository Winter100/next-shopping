import Profile from "@/app/_components/Auth/Profile";
import { myGetServerSession } from "@/app/_lib/getSession";

export default async function MyProfilePage() {
  const session = await myGetServerSession();

  const userInfo = {
    email: session.user.email,
    name: session.user.name,
  };

  return (
    <div>
      <Profile userInfo={userInfo} />
    </div>
  );
}
