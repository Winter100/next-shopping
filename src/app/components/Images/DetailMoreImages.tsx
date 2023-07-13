"use client";
import Image from "next/image";

interface ItemProps {
  src: string;
  indexs: number;
}

export default function DetailMoreImages({ src, indexs }: ItemProps) {
  return (
    <div
      className="cursor-pointer hover:opacity-50 hover:scale-110 m-2"
      onClick={() => window.open(src, "_blank", "width=1000,height=1000")}
    >
      <Image alt={indexs.toLocaleString()} src={src} width={300} height={300} />
    </div>
  );
}
