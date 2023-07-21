import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import Providers from "@/utils/provider";
import Navbar from "./components/Nav/Navbar";
import { CounterContextProvider } from "@/context/wish.context";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "싹다팜",
  description: "싹다팜은 내가 가진 물품을 자유롭게 사고 파는 곳 입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          <Providers>
            <CounterContextProvider>
              <main className="pt-16">{children}</main>
            </CounterContextProvider>
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
