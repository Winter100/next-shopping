// import { verifyPassword } from "@/lib/auth";
// import { connectDatabase } from "@/lib/db";
// import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         username: { label: "", type: "", placeholder: "" },
//         password: { label: "", type: "" },
//       },
//       async authorize(credentials: any, req) {
//         const client = await connectDatabase();
//         const userCollection = client.db().collection("Shopping-User");

//         const findUser = await userCollection.findOne({
//           email: credentials.email,
//         });

//         if (!findUser) {
//           client.close();

//           throw new Error("해당 이메일이 없습니다.");
//         }

//         const isValid = await verifyPassword(
//           credentials.password,
//           findUser.password
//         );

//         if (!isValid) {
//           client.close();

//           throw new Error("비밀번호가 틀렸습니다.");
//         }
//         client.close();

//         if (!findUser) {
//           return null;
//         }

//         const user = {
//           id: findUser.email,
//           name: findUser.name,
//           email: findUser.email,
//         };

//         console.log("user", user);

//         if (user) {
//           return user;
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
// });

// export { handler as GET, handler as POST };
