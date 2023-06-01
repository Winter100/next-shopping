"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Profile() {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/in");
    },
  });

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  const email = data.user?.email;
  const name = data.user?.name;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          My Page
        </h2>
      </div>

      <div className="mt-14 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
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
              <p id="email">{email}</p>
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
              <p id="name">{name}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                비밀번호
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
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
                htmlFor="password2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                비밀번호 확인
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              회원가입
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-600">
          <Link
            href="/auth/in"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
