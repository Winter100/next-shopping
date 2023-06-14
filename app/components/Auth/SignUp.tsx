"use client";

import { User } from "@/type/type";
import Link from "next/link";
import { useState } from "react";
import { checkUser } from "./use/check-user";
import { useRouter } from "next/navigation";
import MongoDbSignUp from "@/app/api/signup/route";

export default function SignUp() {
  const router = useRouter();
  const [userValue, setUserValue] = useState<User>({
    email: "",
    password: "",
    name: "",
  });
  const [checkPassword, setCheckPassword] = useState("");
  const [checkOutput, setCheckOutput] = useState("");

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUserValue({
      ...userValue,
      [e.target.name]: e.target.value,
    });
  }

  function checkPasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckPassword(e.target.value);
  }
  async function signUpHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCheckOutput("가입중...");

    if (checkPassword !== userValue.password) {
      return setCheckOutput("비밀번호가 서로 다릅니다");
    }

    const data = checkUser(userValue);

    if (!data) {
      console.log("실패");
      return;
    }

    const response = await MongoDbSignUp(userValue);
    if (response.status === 201) {
      console.log("가입완료");
      router.push("/");
    } else {
      setCheckOutput(response.message);
    }
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
              <div className="text-sm">
                <button className="font-semibold text-indigo-600 hover:text-indigo-500">
                  이메일 중복 확인
                </button>
              </div>
            </div>

            <div className="mt-2">
              <input
                value={userValue.email}
                onChange={changeHandler}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
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
                value={userValue.password}
                onChange={changeHandler}
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
                value={checkPassword}
                onChange={checkPasswordHandler}
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
            {checkOutput && (
              <p className="text-center text-red-500 font-bold">
                {checkOutput}
              </p>
            )}
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
