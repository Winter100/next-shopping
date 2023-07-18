import { Metadata } from "next";
import HomePage from "./components/Home/HomePage";

export const metadata: Metadata = {
  title: "싹다팜",
  description: "...",
};

export default function Home() {
  return (
    <div className=" min-h-screen bg-base-200">
      <HomePage />
    </div>
  );
}
