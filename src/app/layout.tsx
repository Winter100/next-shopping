import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import Providers from "@/utils/provider";

import { Metadata } from "next";
import Navbar from "./_components/Nav/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "싹다팜",
  description: "싹다팜은 내가 가진 물품을 자유롭게 파는 곳 입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} overflow-y-scroll h-full`}>
        <NextAuthProvider>
          <Navbar />
          <Providers>
            <main className="w-full max-w-4xl m-auto">
              <section>{children}</section>
            </main>
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
