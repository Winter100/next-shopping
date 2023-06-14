"use server";

import { collectionAllProducts } from "@/lib/collectionName";
import { connectDatabase } from "@/lib/db";
import { myGetServerSession } from "@/lib/getSession";

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
