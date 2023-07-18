import BuyBtn from "../Btn/BuyBtn";
import { ProductsType } from "../../type/type";
import DetailMoreImages from "../Images/DetailMoreImages";

export default function ProductDetail({ data }: { data: ProductsType }) {
  return (
    <div className="container mx-auto py-8 mt-15">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <div>
              <DetailMoreImages
                imageType="main"
                src={data.mainImageSrc}
                indexs={99}
              />
            </div>
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

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                카카오톡 아이디
              </h2>
              <p className="font-semibold text-center text-xl text-blue-500">
                {data?.contact}
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                판매 방법
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

            <div className="flex items-center mb-4 mt-[50px]">
              <span className="text-gray-800 font-bold text-xl">
                {`${data.price?.toLocaleString()}원`}
              </span>
              <div className="flex justify-center items-center">
                <BuyBtn
                  email={data.email}
                  id={data._id}
                  soldout={data.soldout}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-4">
          <div className="flex">
            {data.subImageSrc.map((item, indexs) => {
              return (
                <div className="mt-4" key={indexs}>
                  <DetailMoreImages
                    imageType="sub"
                    src={item}
                    indexs={indexs}
                  />
                </div>
              );
            })}
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
