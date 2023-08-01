import Profile from "../components/Auth/Profile";

import { myGetServerSession } from "../lib/getSession";

export default async function MyProfilePage() {
  const session = await myGetServerSession();

  const userInfo = {
    email: session.user.email,
    name: session.user.name,
  };

  return <Profile userInfo={userInfo} />;
}
