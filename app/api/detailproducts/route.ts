"use server";

import { connectDatabase } from "@/lib/db";
import { ProductsType } from "@/type/type";

export default async function DetailProductsData(params: any) {
  const collectionName = "Shopping-All-Products";

  const client = await connectDatabase();
  try {
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
    console.log("e", error);
    return;
  } finally {
    client.close();
  }
}
