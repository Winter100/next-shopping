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
        <div>
          <Image
            className="w-full h-full"
            alt={imageType}
            src={src}
            width={300}
            height={300}
          />
        </div>
      ) : (
        <div className="m-2">
          <Image
            alt={indexs.toLocaleString()}
            src={src}
            width={250}
            height={300}
          />
        </div>
      )}
    </div>
  );
}
