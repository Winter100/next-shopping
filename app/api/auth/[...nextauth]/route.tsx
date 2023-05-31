import { verifyPassword } from "@/lib/auth";
import { connectDatabase } from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")

      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "qwe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        //인증 로직 짜기?
        // Add logic here to look up the user from the credentials supplied

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

        const user = {
          id: findUser.email,
          name: findUser.name,
          email: findUser.email,
        };

        console.log(user);
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
