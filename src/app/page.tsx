import { Metadata } from "next";
import HomePage from "./components/Home/HomePage";

export const metadata: Metadata = {
  title: "싹다팜",
  description: "싹다팜은 내가 가진 물품을 자유롭게 사고 파는 곳 입니다.",
};

export default function Home() {
  return (
    <div className=" min-h-screen bg-base-200">
      <HomePage />
    </div>
  );
}
