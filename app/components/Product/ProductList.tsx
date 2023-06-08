import { ProductsType } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

export default function ProductList({
  products,
}: {
  products: ProductsType[];
}) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/product/detail/${product._id}`}
              className="group"
            >
              <div className="text-center">
                <h3 className="mt-4 text-xl text-gray-700">{product.title}</h3>
              </div>
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  position: "relative",
                }}
              >
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  fill
                  className="w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <p>{`판매자: ${product.name}`}</p>
              <span>{`등록일: ${product.date.year}-${product.date.month}-${product.date.day}`}</span>

              <p className="text-right mt-1 text-lg font-medium text-gray-900">
                {product.price.toLocaleString()}원
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
