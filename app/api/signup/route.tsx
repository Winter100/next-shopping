"use server";

import { hashPassword } from "@/lib/auth";
import { connectDatabase } from "@/lib/db";
import { User } from "@/type/type";

async function MongoDbSignUp(req: User) {
  const collectionName = "Shopping-User";

  const { email, name, password } = req;

  const client = await connectDatabase();

  const db = client.db();

  const existingUser = await db.collection(collectionName).findOne({
    email: email,
  });

  if (existingUser) {
    return { message: "이미 가입된 메일입니다." };
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection(collectionName).insertOne({
    email: email,
    name: name,
    password: hashedPassword,
  });

  client.close();

  return { message: "ok" };
}

export default MongoDbSignUp;
