"use server";
import { collectionAllProducts } from "@/lib/collectionName";
import { connectDatabase } from "@/lib/db";
interface reqType {
  title: string;
  description: string;
  price: number;
  selectedValue: {
    random: string;
    isMeet: string;
    bargaining: string;
  };
  imageSrc: string;
  _id: any;
}

export default async function MongoDbEditProducts(req: reqType) {
  const client = await connectDatabase();

  //해당 유저가 맞는지 한번더 체크하기.
  try {
    const db = client.db();

    const query = { _id: req._id };
    const response = await db.collection(collectionAllProducts).findOne(query);

    if (!response) {
      return { status: 404, message: "등록 정보가 없는 제품입니다." };
    }

    const { title, description, price, selectedValue, imageSrc } = req;

    await db.collection(collectionAllProducts).updateOne(query, {
      $set: { title, description, price, selectedValue, imageSrc },
    });

    return { status: 201, message: "등록제품 수정 성공" };
  } catch (error) {
    console.log(error);
    return { message: "에러발생!" };
  } finally {
    client.close();
  }
}
