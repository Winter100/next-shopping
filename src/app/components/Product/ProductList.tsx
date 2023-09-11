"use client";
import Image from "next/image";
import Link from "next/link";
import { PageInfoProps, ProductsType } from "../../type/type";
import Filters from "../Pagination/Filters";

export default function ProductList({
  products = [],
  pageInfo,
}: {
  products: ProductsType[];
  pageInfo: PageInfoProps;
}) {
  return (
    <div className="bg-white mt-6">
      <div className="flex justify-end my-2 md:my-0">
        <Filters pageInfo={pageInfo} />
      </div>
      <div className="mx-auto  max-w-2xl p-4 lg:max-w-7xl lg:px-6  border-2 shadow-lg rounded-lg">
        <h2 className="sr-only">판매목록</h2>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.length >= 1 &&
            products?.map((product) => (
              <div
                key={product?._id}
                className="border-2 rounded-2xl w-[150px] md:w-[250px]"
              >
                <Link
                  href={`/product/detail/${product?._id}`}
                  className="group"
                >
                  <div className=" w-full h-[170px] md:h-[230px] relative ">
                    <div className="w-full h-full relative">
                      {product?.soldout && (
                        <span className="p-1 bg-black top-0 right-0 text-xs absolute font-sans text-white z-10">
                          거래완료
                        </span>
                      )}
                      <Image
                        src={product?.mainImageSrc}
                        alt={product?.title}
                        fill
                        quality={80}
                        className="group-hover:opacity-75 rounded-t-2xl"
                      />
                    </div>
                  </div>
                </Link>
                <h3 className="text-center truncate border-b-2 py-0.5 font-sans text-xs md:text-sm">
                  {product?.title}
                </h3>
                <div className="text-sm py-0.5">
                  <span className="text-center block text-gray-900 font-bold text-xs md:text-sm ">
                    {product?.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            ))}
        </div>
        {products?.length < 1 && (
          <div className=" my-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="text-center font-sans text-3xl col-span-4 m-auto ">
              등록된 상품이 없습니다.
            </div>
            <div className="w-[250px]"></div>
          </div>
        )}
      </div>
    </div>
  );
}
