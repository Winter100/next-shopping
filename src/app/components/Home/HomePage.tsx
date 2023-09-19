"use clinet";
import { available } from "@/app/lib/constants-url";
import Link from "next/link";
import MainCarousel from "../Display/Carousel/MainCarousel";

export default function HomePage() {
  return (
    <div className="hero ">
      <div className="hero-content text-center ">
        <MainCarousel />
      </div>
    </div>
  );
}
