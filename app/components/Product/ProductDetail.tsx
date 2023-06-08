import { ProductsType } from "@/app/page";
import Image from "next/image";

export default function ProductDetail({ data }: { data: ProductsType }) {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image
              className="w-full rounded-lg"
              src={data.imageSrc}
              alt={data.title}
              width={500}
              height={300}
            />
          </div>
          <div className="md:w-1/2 md:ml-8">
            <h1 className="text-4xl font-semibold text-gray-800 mb-3 text-center mb-10">
              {data.title}
            </h1>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                판매자 정보
              </h2>
              <div>
                <p>{`판매자: ${data.name}`}</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                제품 설명
              </h2>
              <table>
                <tbody>
                  <tr>
                    <td className="font-semibold">Size:</td>
                    <td>Large</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Color:</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Material:</td>
                    <td>Cotton</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center mb-4 mt-[250px]">
              <span className="text-gray-800 font-bold text-xl">
                {data.price}
              </span>
              <button className="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700">
                구매하기
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-gray-300 bg-opacity-75 w-90vw h-500px border shadow-md">
          <div>{data.description}</div>
        </div>
      </div>
    </div>
  );
}

// <div className="container mx-auto py-8">
//   <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
//     <div className="flex flex-col md:flex-row">
//       <div className="md:w-1/2">
//         <img
//           className="w-full rounded-lg"
//           src="https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg"
//           alt="Product"
//         />
//       </div>
//       <div className="md:w-1/2 md:ml-8">
//         <h1 className="text-3xl font-semibold text-gray-800 mb-4">
//           Product Name
//         </h1>
//         <p className="text-gray-600 mb-4">Product description goes here.</p>
//         <div className="flex items-center mb-4">
//           <span className="text-gray-800 font-bold text-xl">$48</span>
//           <button className="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700">
//             Add to Cart
//           </button>
//         </div>
//         <div className="mb-4">
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">
//             Features
//           </h2>
//           <ul className="list-disc list-inside">
//             <li>Feature 1</li>
//             <li>Feature 2</li>
//             <li>Feature 3</li>
//           </ul>
//         </div>
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">
//             Specifications
//           </h2>
//           <table>
//             <tbody>
//               <tr>
//                 <td className="font-semibold">Size:</td>
//                 <td>Large</td>
//               </tr>
//               <tr>
//                 <td className="font-semibold">Color:</td>
//                 <td>Blue</td>
//               </tr>
//               <tr>
//                 <td className="font-semibold">Material:</td>
//                 <td>Cotton</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
