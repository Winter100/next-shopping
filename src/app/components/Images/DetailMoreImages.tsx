"use client";
import Image from "next/image";

interface ItemProps {
  imageType: string;
  src: string;
  indexs: number;
}

export default function DetailMoreImages({
  imageType,
  src,
  indexs,
}: ItemProps) {
  return (
    <div
      className="cursor-pointer hover:opacity-70 hover:scale-105 "
      onClick={() => window.open(src, "_blank", "width=1000,height=1000")}
    >
      {imageType === "main" ? (
        <div className="h-[700px]">
          <Image
            className="w-full h-full"
            alt={imageType}
            src={src}
            width={400}
            height={300}
          />
        </div>
      ) : (
        <div className="justify-center items-center relative w-auto h-64 m-1">
          <Image fill src={src} alt={`Image ${indexs}`} />
        </div>
      )}
    </div>
  );
}
