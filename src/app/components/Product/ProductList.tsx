"use client";
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
      <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 mt-10">
        <h2 className="sr-only">판매목록</h2>
        <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <div key={product._id} className="border-2 rounded-xl w-[250px]">
              <div className="text-center">
                <h3 className="mt-1 text-base text-gray-700 border-b-2">
                  {product.title}
                </h3>
              </div>
              <Link href={`/product/detail/${product._id}`} className="group">
                <div className="flex items-center justify-center w-full h-[250px] relative ">
                  <div className="w-full h-full  relative">
                    <Image
                      src={
                        product.soldout === true
                          ? process.env.NEXT_PUBLIC_SOLDOUT_IMAGE
                          : product.mainImageSrc
                      }
                      alt={product.title}
                      fill
                      quality={80}
                      className="group-hover:opacity-75 "
                    />
                  </div>
                </div>
              </Link>
              <p>{`판매자: ${product.name}`}</p>
              <span>{`등록일: ${product.date.year}-${product.date.month}-${product.date.day}`}</span>

              <p className="text-right mt-1 text-lg font-medium text-gray-900">
                {product.price.toLocaleString()}원
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
