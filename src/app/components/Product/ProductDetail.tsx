import BuyBtn from "../Btn/BuyBtn";
import { ProductsType } from "../../type/type";
import DetailMoreImages from "../Images/DetailMoreImages";
import TagComponent from "./TagComponent";

export default function ProductDetail({ data }: { data: ProductsType }) {
  const date = `${data?.date?.year}-${
    data?.date?.month < 10 ? `0${data?.date?.month}` : data?.date?.month
  }-${data?.date?.day < 10 ? `0${data?.date?.day}` : data?.date?.day}`;

  const tableTr = `table-row`;

  const tableThTd = `${
    data.checkedList?.length > 1 ? "py-1.5" : "py-2.5"
  } text-sm font-medium text-center `;

  return (
    <div className="container mx-auto py-8 mt-15">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="h-8 m-auto">
          <BuyBtn email={data?.email} id={data?._id} soldout={data?.soldout} />
        </div>
        <div className=" flex flex-col md:flex-row border-2 rounded-lg p-2 ">
          <div className="w-10/12 md:w-1/2 lg:w-2/5  m-auto ">
            <DetailMoreImages
              imageType="main"
              src={data?.mainImageSrc}
              indexs={99}
            />
          </div>
          <div className="md:w-1/2 md:ml-1  my-auto">
            <div className="mb-2 border-b-2 text-center ">
              <h1 className="font-serif text-4xl font-bold py-2 mb-2 m-auto  w-4/5 ">
                {data?.title}
              </h1>
            </div>

            <table className=" m-auto w-2/3 text-center">
              <tbody>
                <tr className={`${tableTr}`}>
                  <th scope="row" className={`${tableThTd} `}>
                    판매자
                  </th>
                  <td className={`${tableThTd} `}>{data?.name}</td>
                </tr>
                <tr className={`${tableTr}`}>
                  <th scope="row" className={`${tableThTd} `}>
                    카카오톡
                  </th>
                  <td className={`${tableThTd} `}>{data?.contact}</td>
                </tr>
                <tr className={`${tableTr}`}>
                  <th scope="row" className={`${tableThTd} `}>
                    등록일
                  </th>
                  <td className={`${tableThTd} `}>{date}</td>
                </tr>

                <tr className={`${tableTr}`}>
                  <th scope="row" className={`${tableThTd} `}>
                    거래
                  </th>
                  <td className={`${tableThTd} `}>
                    {data?.soldout ? (
                      <TagComponent value={"no"} text={"거래완료"} />
                    ) : (
                      <TagComponent value={"yes"} text={"거래가능"} />
                    )}
                  </td>
                </tr>

                <tr className={`${tableTr}`}>
                  <th scope="row" className={`${tableThTd} `}>
                    흥정
                  </th>
                  <td className={`${tableThTd} `}>
                    <TagComponent
                      value={data.selectedValue?.bargaining}
                      text={
                        data.selectedValue?.bargaining === "yes"
                          ? "흥정 가능"
                          : "흥정 불가"
                      }
                    />
                  </td>
                </tr>

                <tr className={`${tableTr}`}>
                  <th scope="row" className={`${tableThTd} `}>
                    택배
                  </th>
                  <td className={`${tableThTd} `}>
                    <TagComponent
                      value={data.selectedValue?.random}
                      text={
                        data.selectedValue?.random === "yes"
                          ? "택배 가능"
                          : "택배 불가"
                      }
                    />
                  </td>
                </tr>

                <tr className={`${tableTr}`}>
                  <th scope="row" className={`${tableThTd} `}>
                    직거래
                  </th>
                  <td className={`${tableThTd} `}>
                    <TagComponent
                      value={data.selectedValue?.isMeet}
                      text={
                        data.selectedValue?.isMeet === "yes"
                          ? "직거래 가능"
                          : "직거래 불가"
                      }
                    />
                  </td>
                </tr>

                <tr className={`${tableTr}`}>
                  <th scope="row" className={`${tableThTd} `}>
                    가격
                  </th>
                  <td
                    className={`${
                      data.checkedList?.length > 1 ? "py-1.5" : "py-2.5"
                    } text-sm font-bold text-center `}
                  >{`${data.price?.toLocaleString()}원`}</td>
                </tr>
              </tbody>
            </table>

            {data.checkedList?.length > 1 && (
              <div className=" border-t-2 py-2">
                <h2 className={`text-2xl font-semibold mb-2 text-center`}>
                  직거래 장소
                </h2>
                <div className=" grid grid-cols-4 lg:grid-cols-5 m-auto text-center w-full md:w-11/12">
                  {data.checkedList?.map((item, idx) => (
                    <TagComponent key={item + idx} value={"yes"} text={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:my-6 m-auto w-4/5 my-2 grid grid-cols-5 justify-items-start">
          {data?.subImageSrc?.map((item, index) => (
            <div key={index} className="w-full border-2">
              <DetailMoreImages imageType="sub" src={item} indexs={index} />
            </div>
          ))}
        </div>

        <div
          className="bg-gray-100 bg-opacity-75 p-4 rounded-md shadow"
          style={{ overflow: "auto" }}
        >
          <div className="whitespace-pre-wrap">{data?.description}</div>
        </div>
      </div>
    </div>
  );
}
