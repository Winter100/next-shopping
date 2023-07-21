import Profile from "../components/Auth/Profile";

import { myGetServerSession } from "../lib/getSession";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "My Page",
//   description:
//     "사용자의 이메일과 닉네임을 표시하고 비밀번호를 변경 할 수 있습니다.",
// };

export default async function MyProfilePage() {
  const session = await myGetServerSession();

  const userInfo = {
    email: session.user.email,
    name: session.user.name,
  };

  return <Profile userInfo={userInfo} />;
}
