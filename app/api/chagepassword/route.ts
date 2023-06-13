"use server";

import { connectDatabase } from "@/lib/db";
import { myGetServerSession } from "@/lib/getSession";

interface PasswordType {
  oldPassword: string;
  newPassword: string;
}

export default async function ChangePassword(req: PasswordType) {
  console.log(req);
  const collectionName = "Shopping-All-Products";

  const session = await myGetServerSession();

  const myEmail = session.user.email;

  // try {
  //   const client = await connectDatabase();
  //   const db = client.db();
  //   const query = { email: myEmail };

  //   const response = await db.collection(collectionName).find(query).toArray();

  //   return response;
  // } catch (error) {
  //   console.log(error);
  // }
}
