"use client";

import Link from "next/link";
import { useState } from "react";
import { checkUser } from "./use/check-user";
import { useRouter } from "next/navigation";
import { signUpInput } from "../../type/type";
import LoadingSpinner from "../Spinner/LoadingSpinner";

export default function SignUp() {
  const router = useRouter();
  const [userValue, setUserValue] = useState<signUpInput>({
    email: "",
    password: "",
    checkPassword: "",
    name: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUserValue({
      ...userValue,
      [e.target.name]: e.target.value,
    });
    setMessage("");
  }

  async function signUpHandler(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setMessage("");
      setIsLoading(true);

      const data = checkUser(userValue);

      if (!data.isValid) {
        setIsLoading(false);
        setMessage(data.message);
        return;
      }

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userValue),
      });

      const result = await response.json();
      if (result.status === 201) {
        setMessage("가입완료, 로그인페이지로 이동합니다.");
        setTimeout(() => {
          router.push("/auth/in");
        }, 3000);
        return;
      }
      setIsLoading(false);
      setMessage(result?.message);
    } catch (e) {
      console.log(e);
    }
  }

  async function CheckEmailDuplicate(email: string) {
    setMessage("");
    setIsLoading(true);
    const response = await fetch("/api/signup", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    setMessage(data?.message);
    setIsLoading(false);
    return;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          회원가입
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={signUpHandler} className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이메일
              </label>
              <div
                hidden={
                  userValue.email.trim().length >= 4 &&
                  userValue.email.includes("@")
                    ? false
                    : true
                }
                className="text-sm"
              >
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => CheckEmailDuplicate(userValue.email)}
                  className={`font-semibold ${
                    isLoading ? "text-gray-500" : "text-indigo-600"
                  } `}
                >
                  이메일 중복 확인
                </button>
              </div>
            </div>

            <div className="mt-2">
              <input
                value={userValue.email}
                disabled={isLoading}
                onChange={changeHandler}
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
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              닉네임
            </label>
            <div className="mt-2">
              <input
                value={userValue.name}
                disabled={isLoading}
                autoComplete="off"
                onChange={changeHandler}
                id="name"
                name="name"
                type="text"
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
                autoComplete="off"
                value={userValue.password}
                onChange={changeHandler}
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="checkPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                비밀번호 확인
              </label>
            </div>
            <div className="mt-2">
              <input
                disabled={isLoading}
                autoComplete="off"
                value={userValue.checkPassword}
                onChange={changeHandler}
                id="checkPassword"
                name="checkPassword"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            {message && (
              <p className="text-center text-red-500 font-bold">{message}</p>
            )}
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className={`flex w-full justify-center rounded-md ${
                isLoading ? " bg-gray-500" : "bg-indigo-600"
              }  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm `}
            >
              {!isLoading ? "회원가입" : <LoadingSpinner />}
            </button>
          </div>
        </form>

        {!isLoading && (
          <p className="mt-10 text-center text-sm text-gray-600">
            <Link
              href="/auth/in"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              로그인
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
