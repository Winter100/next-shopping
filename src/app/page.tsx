import { Metadata } from "next";

export const metadata: Metadata = {
  title: "싹다팜의 HomePage",
  description: "...",
};

export default function Home() {
  return (
    <div className="min-h-screen mt-20">
      <div>
        <h2 className="text-5xl text-center">사용 설명서</h2>
      </div>
      <div></div>
    </div>
  );
}
