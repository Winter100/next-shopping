"use server";
import { hashPassword } from "@/lib/auth";
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
      return { message: "정보가 옳바르지 않습니다." };
    }

    const collectionName = "Shopping-User";

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

    await db.collection(collectionName).insertOne({
      email: email,
      name: name,
      password: hashedPassword,
    });

    return { message: "ok" };
  } catch (error) {
    console.log(error);
    return { message: "에러발생!" };
  } finally {
    client.close();
  }
}
