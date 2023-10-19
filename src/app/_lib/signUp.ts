import { User } from "../_type/type";
import { hashPassword } from "./auth";
import { checkEmail, checkName, connectDatabase } from "./db";

const usersCollection = process.env.NEXT_PUBLIC_DATABASE_COL_USERS;

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

    if (checkedEmail.valid) {
      throw new Error(checkedEmail.message);
    }
    if (checkedName.valid) {
      throw new Error(checkedName.message);
    }

    const hashedPassword = await hashPassword(password);

    await db.collection(usersCollection).insertOne({
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
