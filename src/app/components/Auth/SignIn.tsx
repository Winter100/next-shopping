"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../Spinner/LoadingSpinner";

interface LoginType {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userValue, setUserValue] = useState<LoginType>({
    email: "",
    password: "",
  });
  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUserValue({
      ...userValue,
      [e.target.name]: e.target.value,
    });
    setMessage("");
  }
  async function signInHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const response = await signIn("credentials", {
      redirect: false,
      email: userValue.email,
      password: userValue.password,
    });

    if (response?.error) {
      setMessage(response?.error || "잠시후 다시 시도해주세요.");
      setIsLoading(false);
    } else {
      router.push("/");
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            로그인
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={signInHandler}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이메일
              </label>
              <div className="mt-2">
                <input
                  disabled={isLoading}
                  onChange={inputChangeHandler}
                  value={userValue.email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  disabled={isLoading}
                  value={userValue.password}
                  onChange={inputChangeHandler}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {message && (
              <p className="text-center text-red-500 font-bold">{message}</p>
            )}
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className={`flex w-full justify-center rounded-md ${
                  isLoading ? "bg-gray-500" : "bg-indigo-600"
                } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm`}
              >
                {!isLoading ? "로그인" : <LoadingSpinner />}
              </button>
            </div>
          </form>

          {!isLoading && (
            <p className="mt-10 text-center text-sm text-gray-500">
              <Link
                href="/auth/up"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                회원가입
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
