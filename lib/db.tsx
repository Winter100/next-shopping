"use server";
import { MongoClient } from "mongodb";
import { collectionName } from "./collectionName";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.NEXT_PUBLIC_MONGODB_NAME}:${process.env.NEXT_PUBLIC_MONGODB_PASSWORD}@cluster0.bj3zudb.mongodb.net/?retryWrites=true&w=majority`
  );
  return client;
}

export async function checkEmail(checkValue: string) {
  const client = await connectDatabase();
  const db = client.db();

  const existingMail = await db.collection(collectionName).findOne({
    email: checkValue,
  });

  if (existingMail) {
    return { message: "이미 가입된 메일입니다." };
  }

  return;
}

export async function checkName(checkValue: string) {
  const client = await connectDatabase();
  const db = client.db();

  const existingName = await db.collection(collectionName).findOne({
    name: checkValue,
  });

  if (existingName) {
    return { message: "이미 생성된 닉네임입니다." };
  }

  return;
}
