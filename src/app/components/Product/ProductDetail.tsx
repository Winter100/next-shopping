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
              <h1 className={`${headClassNameOption}`}>{data?.title}</h1>
            </div>
            <div className="border-t-2 py-2">
              <h2 className={`${headClassNameOption} `}>판매자 이름</h2>
              <p className=" text-lg text-center font-semibold">{` ${data?.name}`}</p>
            </div>
            <div className="my-8 py-2">
              <h2 className={`${headClassNameOption}`}>카카오톡 아이디</h2>
              <p className="font-semibold text-center text-lg ">
                {data?.contact}
              </p>
            </div>
            <div className="my-8 border-b-2 py-2">
              <h2 className={`${headClassNameOption}`}>판매 옵션</h2>
              <div className="grid grid-cols-3 m-auto my-4 text-center w-full md:w-11/12">
                {data?.soldout ? (
                  <TagComponent value={"no"} text={"거래완료"} />
                ) : (
                  <TagComponent value={"yes"} text={"거래가능"} />
                )}
                <TagComponent
                  value={data.selectedValue?.bargaining}
                  text={
                    data.selectedValue?.bargaining === "yes"
                      ? "흥정 가능"
                      : "흥정 불가"
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

                <TagComponent
                  value={data.selectedValue?.isMeet}
                  text={
                    data.selectedValue?.isMeet === "yes"
                      ? "직거래 가능"
                      : "직거래 불가"
                  }
                />

                {data.region?.length > 1 && (
                  <>
                    <TagComponent
                      key={data?.region}
                      value={"yes"}
                      text={data?.region}
                    />
                    {data.checkedList.map((item, idx) => (
                      <TagComponent
                        key={item + idx}
                        value={"yes"}
                        text={item}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end my-2">
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
