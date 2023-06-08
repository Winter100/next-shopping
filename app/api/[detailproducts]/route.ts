"use server";

import { ProductsType } from "@/app/page";
import { connectDatabase } from "@/lib/db";

export default async function DetailProductsData(params: any) {
  const collectionName = "Shopping-All-Products";

  try {
    const client = await connectDatabase();
    const db = client.db();
    const response = await db
      .collection(collectionName)
      .findOne({ _id: params });

    const {
      selectedValue,
      date,
      title,
      name,
      price,
      imageSrc,
      _id,
      email,
      description,
    } = response;

    const data: ProductsType = {
      title,
      name,
      price,
      imageSrc,
      email,
      description,
      _id,
      selectedValue,
      date,
    };
    return data;
  } catch (error) {
    console.error("데이터 조회 오류:", error);
    throw new Error("데이터 조회 중에 오류가 발생했습니다.");
  }
}
