"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductsType } from "../../type/type";
import MyProductMenu from "../Btn/DropMenu";
// ...

export default function MyProductsList({
  products,
}: {
  products: ProductsType[];
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);

  function handleDropdownToggle(id: string) {
    setIsDropdownOpen((prevId) => (prevId === id ? null : id));
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-3xl font-bold mb-8">내가 올린 물건</h1>
      {products?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <li key={product._id} className="bg-white shadow-lg rounded-lg p-4">
              <div className="relative">
                <div className="absolute top-0 right-0">
                  <button
                    onClick={() => handleDropdownToggle(product._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="" clipRule="evenodd" />
                    </svg>
                  </button>
                  {isDropdownOpen === product._id && (
                    <MyProductMenu
                      productId={product._id}
                      soldout={product.soldout}
                    />
                  )}
                </div>
              </div>
              <Image
                src={
                  product.soldout === true
                    ? process.env.NEXT_PUBLIC_SOLDOUT_IMAGE
                    : product.imageSrc
                }
                alt={product.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg text-center font-semibold">
                {product.title}
              </h2>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-lg">등록된 물건이 없습니다.</p>
      )}
    </div>
  );
}

// export default function MyProductsList({
//   products,
// }: {
//   products: ProductsType[];
// }) {
//   const [isModal, setIsModal] = useState(false);
//   const [modalId, setModalId] = useState<string | null>(null);

//   function deleteHandler(id: string) {
//     setIsModal(true);
//     setModalId(id);
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 mt-8">
//       <h1 className="text-3xl font-bold mb-8">내가 올린 물건</h1>
//       {products?.length > 0 ? (
//         <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <li key={product._id} className="bg-white shadow-lg rounded-lg p-4">
//               {modalId === product._id && isModal && (
//                 <Modal setIsModal={setIsModal} id={modalId} />
//               )}
//               <Image
//                 src={product.imageSrc}
//                 alt={product.title}
//                 width={300}
//                 height={200}
//                 className="w-full h-48 object-cover rounded-md mb-4"
//               />
//               <h2 className="text-lg text-center font-semibold">
//                 {product.title}
//               </h2>
//               <div className="mt-4 flex justify-evenly items-center">
//                 <Link
//                   href={`/profile/message/${product._id}`}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   쪽지
//                 </Link>
//                 <Link
//                   href={`/product/edit/${product._id}`}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   수정
//                 </Link>
// <button
//   onClick={() => deleteHandler(product._id)}
//   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
// >
//   삭제
// </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-600 text-lg">등록된 물건이 없습니다.</p>
//       )}
//     </div>
//   );
// }
