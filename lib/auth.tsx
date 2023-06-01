import { hash, compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDatabase } from "./db";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);

  return isValid;
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
        const userCollection = client.db().collection("Shopping-User");

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
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
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
