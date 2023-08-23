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
      className="cursor-pointer hover:opacity-90 "
      onClick={() => window.open(src, "_blank", "width=1000,height=1000")}
    >
      {imageType === "main" ? (
        <div className="w-auto h-[600px] relative">
          <Image className="w-full h-full" alt={imageType} src={src} fill />
        </div>
      ) : (
        <div className="justify-center items-center relative w-auto h-28 m-1">
          <Image fill src={src} alt={`Image ${indexs}`} />
        </div>
      )}
    </div>
  );
}
