"use server";

import { connectDatabase } from "@/lib/db";

export default async function GET() {
  const collectionName = "Shopping-All-Products";

  try {
    const client = await connectDatabase();
    const db = client.db();
    const projection = {
      title: 1,
      price: 1,
      date: 1,
      name: 1,
      _id: 1,
      imageSrc: 1,
    };
    const documents = await db
      .collection(collectionName)
      .find({}, { projection })
      .toArray();

    const transFormedData = documents.map((item) => {
      const dateObj = new Date(item.date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();

      return {
        title: item.title,
        price: item.price,
        date: { year, month, day },
        name: item.name,
        _id: item._id,
        imageSrc: item.imageSrc,
      };
    });
    return transFormedData;
  } catch (error) {
    console.error("데이터 조회 오류:", error);
    throw new Error("데이터 조회 중에 오류가 발생했습니다.");
  }
}
