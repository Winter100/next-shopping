import { hash, compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDatabase } from "./db";

const usersCollection = process.env.NEXT_PUBLIC_DATABASE_COL_USERS;

export interface PasswordType {
  oldPassword: string;
  newPassword: string;
}

interface userInfoType {
  email: string;
  name: string;
}

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);

  return isValid;
}

export async function changePassword(
  req: PasswordType,
  userInfo: userInfoType
) {
  const { newPassword, oldPassword } = req;
  const userEmail = userInfo.email;
  const userName = userInfo.name;

  if (
    !newPassword ||
    !oldPassword ||
    newPassword.trim().length < 6 ||
    oldPassword.trim().length < 6 ||
    !userEmail
  ) {
    //메시지 추가하기
    return;
  }

  const client = await connectDatabase();
  try {
    const db = client.db();
    const query = { email: userEmail, name: userName };

    const user = await db.collection(usersCollection).findOne(query);

    if (!user) {
      return { Message: "존재하지 않는 회원입니다." };
    }

    const currentPassword = user.password;
    const passwordsAreEqual = await verifyPassword(
      oldPassword,
      currentPassword
    );

    if (!passwordsAreEqual) {
      return { Message: "입력한 비밀번호가 다릅니다." };
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await db
      .collection(usersCollection)
      .updateOne({ email: userEmail }, { $set: { password: hashedPassword } });

    return { message: "비밀번호 변경 성공" };
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "", type: "", placeholder: "" },
        password: { label: "", type: "" },
      },
      async authorize(credentials: any, req) {
        const client = await connectDatabase();
        console.log(credentials);
        const userCollection = client.db().collection(usersCollection);

        const findUser = await userCollection.findOne({
          email: credentials.email,
        });

        if (!findUser) {
          client.close();

          throw new Error("해당 이메일이 없습니다.");
        }

        const isValid = await verifyPassword(
          credentials.password,
          findUser.password
        );

        if (!isValid) {
          client.close();
          throw new Error("비밀번호가 틀렸습니다.");
        }
        client.close();

        if (!findUser) {
          return null;
        }

        const user = {
          id: findUser.email,
          name: findUser.name,
          email: findUser.email,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      const email = session.user.email;
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
