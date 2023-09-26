import { PageInfoProps, ProductsType } from "../../type/type";
import Filters from "../Pagination/Filters";
import ItemCard from "../Display/Card/ItemCard";

export default function ProductList({
  products = [],
  pageInfo,
}: {
  products: ProductsType[];
  pageInfo: PageInfoProps;
}) {
  return (
    <div className="my-4">
      <div className="flex justify-end mb-2">
        <Filters pageInfo={pageInfo} />
      </div>
      <div className="mx-auto">
        <h2 className="sr-only">판매목록</h2>
        <div className="grid grid-cols-2 px-2 gap-2 sm:px-0 md:gap-4 md:grid-cols-3">
          {products?.length >= 1 &&
            products?.map((product) => (
              <div key={product?._id} className="mb-4 md:mb-2">
                <ItemCard product={product} />
              </div>
            ))}
        </div>
        {products?.length < 1 && (
          <div className="my-12 grid grid-cols-2 gap-4 md:grid-cols-3 ">
            <div className="text-center text-3xl col-span-3 m-auto ">
              등록된 상품이 없습니다.
            </div>
            <div className="w-[250px]"></div>
          </div>
        )}
      </div>
    </div>
  );
}
