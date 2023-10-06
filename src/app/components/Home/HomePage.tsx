"use clinet";
// import { available } from "@/app/lib/constants-url";
// import Link from "next/link";
// import Image from "next/image";
// import homeImage from "../../../../public/home.png";

//이용방법 추가하기?

export default function HomePage() {
  return (
    <section className="w-full py-12  bg-amber-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                싹다팜
              </h1>
              <p className="max-w-[600px] text-xs md:text-xl dark:text-zinc-100 mx-auto">
                싹다팜은 내가 가진 물품을 자유롭게 파는 곳 입니다.
              </p>
            </div>
            <div className="w-full max-w-full space-y-4 mx-auto">
              <div className="grid grid-cols-3 gap-8">
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <svg
                      className="text-white h-6 w-6 mb-2 opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold ">상품찾기</h2>
                  <p className="text-zinc-200 dark:text-zinc-100">
                    상품리스트에서 원하는 물건을 찾아 볼 수 있습니다.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <svg
                      className=" text-white h-6 w-6 mb-2 opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold ">검색하기</h2>
                  <p className="text-zinc-200 dark:text-zinc-100">
                    검색창을 이용해 원하는 상품을 검색 할 수 있습니다.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <svg
                      className="text-white  h-6 w-6 mb-2 opacity-75"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold ">회원가입</h2>
                  <p className="text-zinc-200 dark:text-zinc-100">
                    회원가입 후 상품을 판매하거나 찜 목록에 추가 할 수 있습니다.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <svg
                      className="text-white  h-6 w-6 mb-2 opacity-75"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        fill="current"
                        d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                      ></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold ">상품판매</h2>
                  <p className="text-zinc-200 dark:text-zinc-100">
                    로그인 후 원하는 상품을 등록해 판매 할 수 있습니다.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white  h-6 w-6 mb-2 opacity-75"
                    >
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold ">판매목록</h2>
                  <p className="text-zinc-200 dark:text-zinc-100">
                    로그인 후 상품을 등록한 뒤 판매목록에서 관리 할 수 있습니다.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white  h-6 w-6 mb-2 opacity-75"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold ">찜 목록</h2>
                  <p className="text-zinc-200 dark:text-zinc-100">
                    로그인 후 원하는 상품을 찜 한뒤 찜목록에서 관리 할 수
                    있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// export default function HomePage() {
//   return (
//     <div className="h-full">
//       <div className="m-auto w-full h-96 sm:w-[612px] sm:h-[408px] relative">
//         <Image src={homeImage} alt="홈페이지 이미지" fill />
//       </div>
//     </div>
//   );
// }
