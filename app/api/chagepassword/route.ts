"use server";

import { hashPassword, verifyPassword } from "@/lib/auth";
import { connectDatabase } from "@/lib/db";

interface PasswordType {
  oldPassword: string;
  newPassword: string;
}

interface userInfoType {
  email: string;
  name: string;
}

export default async function ChangePassword(
  req: PasswordType,
  userInfo: userInfoType
) {
  const { newPassword, oldPassword } = req;
  const userEmail = userInfo.email;

  if (
    !newPassword ||
    !oldPassword ||
    newPassword.trim().length <= 6 ||
    oldPassword.trim().length <= 6 ||
    !userEmail
  ) {
    return;
  }

  const client = await connectDatabase();
  try {
    const collectionName = "Shopping-User";

    const db = client.db();
    const query = { email: userEmail };

    const user = await db.collection(collectionName).findOne(query);

    if (!user) {
      client.close();
      return { Message: "존재하지 않는 회원입니다." };
    }

    const currentPassword = user.password;
    const passwordsAreEqual = await verifyPassword(
      oldPassword,
      currentPassword
    );

    if (!passwordsAreEqual) {
      client.close();
      return { Message: "입력한 비밀번호가 다릅니다." };
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await db
      .collection(collectionName)
      .updateOne({ email: userEmail }, { $set: { password: hashedPassword } });

    return { message: result };
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}
