"use server";
import { MongoClient } from "mongodb";
import { collectionUsers } from "./collectionName";

export async function connectDatabase() {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.NEXT_PUBLIC_MONGODB_NAME}:${process.env.NEXT_PUBLIC_MONGODB_PASSWORD}@cluster0.bj3zudb.mongodb.net/?retryWrites=true&w=majority`
    );
    return client;
  } catch (error) {
    console.log("몽고 DB연결 중 에러");
  }
}

export async function checkEmail(checkValue: string) {
  const client = await connectDatabase();
  try {
    const db = client.db();

    const existingMail = await db.collection(collectionUsers).findOne({
      email: checkValue,
    });

    if (existingMail) {
      return { message: "이미 가입된 메일입니다." };
    }

    return;
  } catch (error) {
    console.log("이메일 중복확인 중 에러", error);
  } finally {
    client.close();
  }
}

export async function checkName(checkValue: string) {
  const client = await connectDatabase();
  try {
    const db = client.db();

    const existingName = await db.collection(collectionUsers).findOne({
      name: checkValue,
    });

    if (existingName) {
      return { message: "이미 생성된 닉네임입니다." };
    }

    return;
  } catch (error) {
    console.log("닉네임 중복확인 중 에러", error);
  } finally {
    client.close();
  }
}
