"use server";

import { collectionAllProducts } from "@/app/lib/collectionName";
import { connectDatabase } from "@/app/lib/db";
import { ProductsType } from "@/app/type/type";

export default async function DetailProductsData(params: any) {
  const client = await connectDatabase();
  try {
    const db = client.db();
    const response = await db
      .collection(collectionAllProducts)
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
