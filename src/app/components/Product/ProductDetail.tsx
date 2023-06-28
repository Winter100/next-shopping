import Image from "next/image";
import BuyBtn from "../Btn/BuyBtn";
import { ProductsType } from "../../type/type";

export default function ProductDetail({
  data,
  iswish,
}: {
  data: ProductsType;
  iswish: boolean;
}) {
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
            <h1 className="text-4xl font-semibold text-gray-800 text-center mb-10">
              {data.title}
            </h1>
            <div className="mt-12 mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                판매자 정보
              </h2>
              <div>
                <p className="text-blue-500 text-xl text-center font-semibold">{` ${data.name}`}</p>
              </div>
            </div>
            <div className="mt-16">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                제품 설명
              </h2>
              <table className="border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="font-semibold py-2 px-4">흥정여부</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        {data.selectedValue?.bargaining === "yes" ? (
                          <>
                            <div className="bg-blue-300 text-white-500 font-bold py-2 px-4 rounded cursor-not-allowed">
                              <span>O</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-red-300 text-white-500 font-bold py-2 px-4 rounded cursor-not-allowed">
                              <span>X</span>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="font-semibold py-2 px-4">직거래여부</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        {data.selectedValue?.isMeet === "yes" ? (
                          <>
                            <div className="bg-blue-300 text-white-500 font-bold py-2 px-4 rounded cursor-not-allowed">
                              <span>O</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-red-300 text-white-500 font-bold py-2 px-4 rounded cursor-not-allowed">
                              <span>X</span>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-2 px-4">지역선택</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        {data.selectedValue?.random === "yes" ? (
                          <>
                            <div className="bg-blue-300 text-white-500 font-bold py-2 px-4 rounded cursor-not-allowed">
                              <span>O</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-red-300 text-white-500 font-bold py-2 px-4 rounded cursor-not-allowed">
                              <span>X</span>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center mb-4 mt-[100px]">
              <span className="text-gray-800 font-bold text-xl">
                {`${data.price?.toLocaleString()}원`}
              </span>
              <div className="flex justify-center items-center">
                <BuyBtn email={data.email} id={data._id} iswish={iswish} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-gray-200 bg-opacity-75 p-4 rounded-md shadow"
          style={{ maxHeight: "600px", overflow: "auto" }}
        >
          <div style={{ whiteSpace: "pre-line" }}>{data.description}</div>
        </div>
      </div>
    </div>
  );
}
