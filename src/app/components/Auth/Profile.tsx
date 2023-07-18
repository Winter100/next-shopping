"use client";

import { useState } from "react";
import LoadingSpinner from "../Spinner/LoadingSpinner";

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
  const [isLoading, setIsLoading] = useState(false);

  function chagePasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

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
    const response = await fetch("/api/chagepassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    });

    if (response.status === 200) {
      setIsLoading(false);
      setMessage("비밀번호가 변경되었습니다.");
      return;
    } else {
      setIsLoading(false);
      return;
    }
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
              <p className="text-red-600">{message}</p>
            </div>
          )}
          {!isLoading ? (
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              비밀번호 변경
            </button>
          ) : (
            <div className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <LoadingSpinner />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
