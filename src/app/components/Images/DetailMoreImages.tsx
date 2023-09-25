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
      className="cursor-pointer hover:opacity-90 relative block "
      onClick={() => window.open(src, "_blank", "width=1000,height=1000")}
    >
      {imageType === "main" ? (
        <div className="md:h-[430px] h-[380px]">
          <Image fill src={src} alt={imageType} />
        </div>
      ) : (
        <div className=" h-20 md:h-36 ">
          <Image fill src={src} alt={`Image ${indexs}`} quality={90} />
        </div>
      )}
    </div>
  );
}
