"use client";

import ChangePassword from "@/app/api/chagepassword/route";
import { useState } from "react";

interface userInfoType {
  email: string;
  name: string;
}

export default function Profile({ userInfo }: { userInfo: userInfoType }) {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");

  function chagePasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !password.newPassword ||
      !password.oldPassword ||
      password.newPassword.trim().length <= 6 ||
      password.oldPassword.trim().length <= 6
    ) {
      return setMessage("비밀번호가 다르거나 6자 이하입니다.");
    }

    const passwordData = {
      oldPassword: password.oldPassword,
      newPassword: password.newPassword,
    };
    const response = await ChangePassword(passwordData);

    // const data = await response.json();
    // console.log("data", data);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          My Page
        </h2>
      </div>

      <div className="mt-14 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이메일
              </label>
            </div>

            <div className="mt-2">
              <p id="email">{userInfo.email}</p>
            </div>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              닉네임
            </label>
            <div className="mt-2">
              <p id="name">{userInfo.name}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                현재 비밀번호
              </label>
            </div>
            <div className="mt-2">
              <input
                value={password.oldPassword}
                onChange={chagePasswordHandler}
                id="oldPassword"
                name="oldPassword"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                변경 할 비밀번호
              </label>
            </div>
            <div className="mt-2">
              <input
                value={password.newPassword}
                onChange={chagePasswordHandler}
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {message && (
            <div className="text-center">
              <p> {message}</p>
            </div>
          )}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              비밀번호 변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// import { redirect } from "next/navigation";
// import { useSession } from "next-auth/react";

// const { status, data } = useSession({
//   required: true,
//   onUnauthenticated() {
//     redirect("/auth/in");
//   },
// });

// if (status === "loading") {
//   return <p>Loading....</p>;
// }

// const email = data?.user?.email;
// const name = data?.user?.name;
