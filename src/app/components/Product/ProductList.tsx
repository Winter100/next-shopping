import Image from "next/image";
import Link from "next/link";
import { ProductsType } from "../../type/type";

export default function ProductList({
  products = [],
}: {
  products: ProductsType[];
}) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8  border-2 shadow-lg rounded-lg py-4">
        <h2 className="sr-only">판매목록</h2>
        <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <div key={product?._id} className="border-2  rounded-2xl w-[250px]">
              <Link href={`/product/detail/${product?._id}`} className="group">
                <div className="flex items-center justify-center w-full h-[250px] relative ">
                  <div className="w-full h-full  relative">
                    <Image
                      src={
                        product?.soldout === true
                          ? process.env.NEXT_PUBLIC_SOLDOUT_IMAGE
                          : product?.mainImageSrc
                      }
                      alt={product?.title}
                      fill
                      quality={80}
                      className="group-hover:opacity-75 rounded-t-2xl"
                    />
                  </div>
                </div>
              </Link>
              <h3 className="text-center border-y-2 font-mono">
                {product?.title}
              </h3>
              <div className=" text-sm p-1">
                <span className="block">{`판매자: ${product?.name}`}</span>
                <span className="block ">{`등록일: ${product?.date?.year}-${product?.date?.month}-${product?.date?.day}`}</span>

                <span className="text-right block text-gray-900 font-bold ">
                  {product?.price.toLocaleString()}원
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
