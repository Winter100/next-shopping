"use server";

import { hashPassword } from "@/lib/auth";
import { collectionUsers } from "@/lib/collectionName";
import { checkEmail, checkName, connectDatabase } from "@/lib/db";

import { User } from "@/type/type";

export default async function MongoDbSignUp(req: User) {
  const client = await connectDatabase();

  try {
    const { email, name, password } = req;

    if (
      email.trim().length === 0 ||
      !email.includes("@") ||
      name.trim().length === 0 ||
      !name ||
      !password ||
      password.trim().length === 0
    ) {
      return { message: "모든 정보를 채워주세요." };
    }

    const db = client.db();

    const checkedEmail = await checkEmail(email);
    const checkedName = await checkName(name);

    if (checkedEmail) {
      return { message: checkedEmail.message };
    }
    if (checkedName) {
      return { message: checkedName.message };
    }

    const hashedPassword = await hashPassword(password);

    await db.collection(collectionUsers).insertOne({
      email: email,
      name: name,
      password: hashedPassword,
    });

    return { status: 201, message: "가입성공" };
  } catch (error) {
    return { message: "가입중 에러 발생!", error: error };
  } finally {
    client.close();
  }
}
