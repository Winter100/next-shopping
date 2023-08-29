import BuyBtn from "../Btn/BuyBtn";
import { ProductsType } from "../../type/type";
import DetailMoreImages from "../Images/DetailMoreImages";
import TagComponent from "./TagComponent";

export default function ProductDetail({ data }: { data: ProductsType }) {
  const headClassNameOption = "text-2xl font-semibold my-2 text-center";
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
              <h1 className={`${headClassNameOption} `}>{data?.title}</h1>
            </div>
            <div className="border-t-2">
              <h2 className={`${headClassNameOption} `}>판매자 이름</h2>
              <p className=" text-lg text-center font-semibold">{` ${data?.name}`}</p>
            </div>
            <div className="my-8">
              <h2 className={`${headClassNameOption}`}>카카오톡 아이디</h2>
              <p className="font-semibold text-center text-lg ">
                {data?.contact}
              </p>
            </div>
            <div className="my-8 border-b-2">
              <h2 className={`${headClassNameOption}`}>판매 옵션</h2>
              <div className="flex items-center justify-center my-4">
                <TagComponent
                  value={data.selectedValue?.bargaining}
                  text={
                    data.selectedValue?.bargaining === "yes"
                      ? "흥정 가능"
                      : "흥정 불가"
                  }
                />
                <TagComponent
                  value={data.selectedValue?.isMeet}
                  text={
                    data.selectedValue?.isMeet === "yes"
                      ? "직거래 가능"
                      : "직거래 불가"
                  }
                />
                <TagComponent
                  value={data.selectedValue?.random}
                  text={
                    data.selectedValue?.random === "yes"
                      ? "택배 가능"
                      : "택배 불가"
                  }
                />
              </div>
              <div>서울</div>
            </div>

            <div className="flex items-center justify-end my-4">
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
            <div className="text-center m-auto">
              {data?.soldout ? (
                <p className="text-red-600 text-sm">거래 완료 물품입니다</p>
              ) : (
                <p className=" text-green-600 text-sm">거래 가능 물품입니다</p>
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
