import Image from "next/image";
import Link from "next/link";

export default function ItemCard({ product }: any) {
  const timeDifferenceMillis =
    product?.serverMilliseconds - product?.AddProductMillseconds;
  const isNew =
    product?.serverMilliseconds - product?.AddProductMillseconds <=
    24 * 60 * 60 * 1000;

  let displayText = "";
  if (timeDifferenceMillis < 60 * 1000) {
    displayText = "방금";
  } else if (timeDifferenceMillis < 60 * 60 * 1000) {
    const minutesAgo = Math.floor(timeDifferenceMillis / (60 * 1000));
    displayText = `${minutesAgo}분 전`;
  } else if (timeDifferenceMillis < 24 * 60 * 60 * 1000) {
    const hoursAgo = Math.floor(timeDifferenceMillis / (60 * 60 * 1000));
    displayText = `${hoursAgo}시간 전`;
  } else {
    const daysAgo = Math.floor(timeDifferenceMillis / (24 * 60 * 60 * 1000));
    displayText = `${daysAgo}일 전`;
  }
  return (
    <div className="card w-2/3 sm:w-full h-full m-auto bg-base-100 shadow-xl  ">
      <Link href={`/product/detail/${product?._id}`}>
        <figure className=" w-full h-60 relative overflow-hidden group">
          <Image
            fill
            src={product?.mainImageSrc}
            alt={product?.title}
            className="transition-transform duration-300 transform scale-100 group-hover:scale-105"
          />
        </figure>
        <div className="p-3 md:card-body">
          {/* <div className="p-4 sm:card-body"> */}
          <h2 className="card-title">
            <span className="truncate">{product?.title}</span>

            {isNew && <div className="badge badge-secondary">NEW</div>}
            {product?.soldout && (
              <div className="badge badge-primary">SoldOut</div>
            )}
          </h2>

          <div className="card-actions justify-between my-2 sm:my-0">
            <div className="badge badge-outline">{displayText}</div>
            <div className=" text-sm font-bold">
              {product?.price?.toLocaleString()}원
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
