import BuyBtn from "../Btn/BuyBtn";
import { ProductsType } from "../../type/type";
import DetailMoreImages from "../Images/DetailMoreImages";

export default function ProductDetail({ data }: { data: ProductsType }) {
  return (
    <div className="container mx-auto py-8 mt-15">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className=" flex flex-col md:flex-row border-2 rounded-lg p-2">
          <div className="md:w-1/2 ">
            <DetailMoreImages
              imageType="main"
              src={data?.mainImageSrc}
              indexs={99}
            />
          </div>
          <div className="md:w-1/2 md:ml-2">
            <div className="flex items-center justify-center h-16 my-2">
              <h1 className="text-3xl font-semibold text-center">
                {data?.title}
              </h1>
            </div>
            <div className="border-t-2">
              <h2 className="text-2xl font-semibold text-gray-800 mt-2 mb-2 text-center">
                판매자 이름
              </h2>
              <div>
                <p className="text-blue-500 text-xl text-center font-semibold">{` ${data?.name}`}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                카카오톡 아이디
              </h2>
              <p className="font-semibold text-center text-xl text-blue-500">
                {data?.contact}
              </p>
            </div>

            <div className="mt-12 border-b-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                판매 방법
              </h2>
              <table className="border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="font-semibold py-2 px-4">흥정 여부</td>
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
                    <td className="font-semibold py-2 px-4">직 거래</td>
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
                    <td className="font-semibold py-2 px-4">택배 거래</td>
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

            <div className="flex items-center justify-end my-3">
              <span className="text-gray-800 font-bold text-xl ">
                {`${data.price?.toLocaleString()}원`}
              </span>
              <div className="flex justify-center items-center">
                <BuyBtn
                  email={data?.email}
                  id={data?._id}
                  soldout={data?.soldout}
                />
              </div>
            </div>
            <div className="text-center">
              {data?.soldout ? (
                <p className="text-red-600 text-sm">거래가 완료된 물품입니다</p>
              ) : (
                <p className=" text-green-600 text-sm">
                  거래가 가능한 물품입니다
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center mt-12 mb-12">
          {data?.subImageSrc?.map((item, index) => (
            <div key={index} className="w-1/5 items-center  border-2">
              <DetailMoreImages imageType="sub" src={item} indexs={index} />
            </div>
          ))}
        </div>

        <div
          className="bg-gray-200 bg-opacity-75 p-4 rounded-md shadow"
          style={{ overflow: "auto" }}
        >
          <div className="whitespace-pre-wrap">{data?.description}</div>
        </div>
      </div>
    </div>
  );
}
