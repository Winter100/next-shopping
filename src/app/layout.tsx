import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import Providers from "@/utils/provider";
import Navbar from "./components/Nav/Navbar";
import { CounterContextProvider } from "@/context/wish.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "싹다팜",
  description: "자유롭게 물건을 올리고 사고파는 곳",
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
