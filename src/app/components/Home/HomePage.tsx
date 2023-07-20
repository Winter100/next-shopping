"use clinet";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="hero ">
      <div className="hero-content text-center ">
        <div className="max-w-md mt-44 ">
          <h1 className="text-5xl font-bold mb-6">싹다팜!</h1>
          <div className="mb-10">
            <p className="py-4">안녕하세요! 싹다팜입니다.</p>
            <p className="py-4">
              싹다팜은 내가 가진 물품을 자유롭게 파는 곳 입니다.
            </p>
          </div>
          <Link href={`/allproducts/1`} className="btn btn-primary">
            물품 보러가기
          </Link>
        </div>
      </div>
    </div>
  );
}
