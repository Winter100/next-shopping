"use server";

import { connectDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function GetMyProductItems() {
  const collectionName = "Shopping-All-Products";

  const session = await getServerSession(authOptions);

  const myEmail = session.user.email;

  try {
    const client = await connectDatabase();
    const db = client.db();
    const query = { email: myEmail };

    const response = await db.collection(collectionName).find(query).toArray();

    return response;
  } catch (error) {
    console.log(error);
  }
}
