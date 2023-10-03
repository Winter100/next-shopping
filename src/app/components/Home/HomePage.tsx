"use clinet";
import { available } from "@/app/lib/constants-url";
import Image from "next/image";
import Link from "next/link";
import homeImage from "../../../../public/home.jpg";

export default function HomePage() {
  return (
    <div className="grid m-auto grid-cols-8 h-64 sm:h-96 bg-orange-50 my-12 ">
      <div className=" col-span-5 m-auto">
        <div className="h-full">
          <div className="text-center p-4">
            <p className=" text-xs sm:text-sm my-8">
              싹다팜은 내가 가진 물품을 자유롭게 파는 곳 입니다
            </p>
            <Link className=" font-bold" href={available}>
              보러가기
            </Link>
          </div>
        </div>
      </div>
      <div className=" m-auto col-span-3 relative h-32 w-full sm:h-80">
        <Image src={homeImage} alt="홈페이지 이미지" fill />
      </div>
    </div>
  );
}
