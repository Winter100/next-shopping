"use clinet";
import { available } from "@/app/lib/constants-url";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="m-auto h-52 text-center  ">
      <div className=" text-sm grid grid-rows-2 mt-10">
        <p>싹다팜은 자유롭게 물건을 파는 곳 입니다.</p>

        <div className="my-2">
          <Link className=" btn-square" href={available}>
            보러가기
          </Link>
        </div>
      </div>
    </div>
  );
}
