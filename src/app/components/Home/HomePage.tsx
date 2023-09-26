"use clinet";
import { available } from "@/app/lib/constants-url";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="m-auto h-52 text-center  ">
      <div className=" text-sm grid grid-rows-2 mt-28">
        <p>싹다팜은 내가 가진 물품을 자유롭게 파는 곳 입니다.</p>
        <div className="m-auto">
          <Link
            className="inline-block my-2 w-32 rounded-full border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            href={available}
          >
            보러가기
          </Link>
        </div>
      </div>
    </div>
  );
}
