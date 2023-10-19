"use client";

import { useState } from "react";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { signOut } from "next-auth/react";

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
    setMessage("");

    if (userInfo.name === "테스트계정") {
      setMessage("테스트 계정은 비밀번호 변경이 불가능합니다.");
      setIsLoading(false);
      return;
    }

    if (
      !password.newPassword ||
      !password.oldPassword ||
      password.newPassword.trim().length < 6 ||
      password.oldPassword.trim().length < 6
    ) {
      setIsLoading(false);
      return setMessage("비밀번호가 다르거나 6자 이상이어야 합니다.");
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

    const data = await response.json();

    setIsLoading(false);
    if (data.status === 201) {
      setMessage(data.message + "다시 로그인해주세요.");
      setTimeout(() => {
        signOut();
      }, 2000);
      return;
    } else {
      setMessage(data.message);
    }
  }

  const tagStyles = `block text-base font-bold leading-6 text-gray-900`;

  return (
    <div className="flex flex-1 flex-col justify-center px-3">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          My Page
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="email" className={`${tagStyles}`}>
                이메일
              </label>
            </div>

            <div className="mt-2">
              <p id="email">{userInfo.email}</p>
            </div>
          </div>

          <div>
            <label htmlFor="name" className={`${tagStyles}`}>
              닉네임
            </label>
            <div className="mt-2">
              <p id="name">{userInfo.name}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="oldPassword" className={`${tagStyles}`}>
                현재 비밀번호
              </label>
            </div>
            <div className="mt-2">
              <input
                disabled={isLoading}
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
              <label htmlFor="newPassword" className={`${tagStyles}`}>
                변경 할 비밀번호
              </label>
            </div>
            <div className="mt-2">
              <input
                disabled={isLoading}
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
            <div
              className={`flex w-full justify-center rounded-md ${
                isLoading ? "bg-gray-500" : "bg-indigo-600"
              } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm`}
            >
              <LoadingSpinner />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
