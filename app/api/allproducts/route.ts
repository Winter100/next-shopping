"use server";

import { collectionAllProducts } from "@/lib/collectionName";
import { connectDatabase } from "@/lib/db";

export default async function GET() {
  const client = await connectDatabase();
  try {
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
      .collection(collectionAllProducts)
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
    return;
  } finally {
    client.close();
  }
}
