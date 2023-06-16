import { hashPassword } from "@/lib/auth";
import { collectionUsers } from "@/lib/collectionName";
import { checkEmail, checkName, connectDatabase } from "@/lib/db";

export async function MongoDbSignUp(req: User) {
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
      throw new Error("모든 정보를 채워주세요.");
    }

    const db = client.db();

    const checkedEmail = await checkEmail(email);
    const checkedName = await checkName(name);

    if (checkedEmail) {
      throw new Error(checkedEmail.message);
    }
    if (checkedName) {
      throw new Error(checkedName.message);
    }

    const hashedPassword = await hashPassword(password);

    await db.collection(collectionUsers).insertOne({
      email: email,
      name: name,
      password: hashedPassword,
    });

    return { status: 201, message: "가입 성공" };
  } catch (e) {
    if (e instanceof Error) {
      return { message: e.message };
    } else {
      return { message: String(e) };
    }
  } finally {
    client.close();
  }
}
