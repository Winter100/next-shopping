"use server";

import { connectDatabase } from "@/lib/db";

export interface AddProductsType {
  title: string;
  description: string;
  price: number;
  selectedValue: {
    random: string;
    isMeet: string;
    bargaining: string;
  };
  imageSrc: string;
  email: string | null | undefined;
  name: string | null | undefined;
}

export default async function MongoDbAddProducts(req: AddProductsType) {
  const collectionName = "Shopping-All-Products";

  const client = await connectDatabase();

  try {
    const { v4: uuidv4 } = require("uuid");
    const id = uuidv4();
    const date = Date.now();

    const db = client.db();

    const response = await db.collection(collectionName).insertOne({
      _id: id,
      date: date,
      ...req,
    });

    return { status: 201, message: "등록성공" };
  } catch (error) {
    console.log(error);
    return { message: "에러발생!" };
  } finally {
    client.close();
  }
}
