"use server";

import { collectionAllProducts } from "@/app/lib/collectionName";
import { connectDatabase } from "@/app/lib/db";
import { myGetServerSession } from "@/app/lib/getSession";

export default async function GetMyProductItems() {
  const session = await myGetServerSession();

  const client = await connectDatabase();
  try {
    const myEmail = session.user.email;

    const db = client.db();
    const query = { email: myEmail };

    const response = await db
      .collection(collectionAllProducts)
      .find(query)
      .toArray();

    return response;
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}
