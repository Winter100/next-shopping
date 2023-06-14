"use server";
import { collectionAllProducts } from "@/lib/collectionName";
import { connectDatabase } from "@/lib/db";

interface MongoDbDeleteType {
  id: any;
  email: string;
  name: string;
}

export default async function MongoDbDelete({
  id,
  email,
  name,
}: MongoDbDeleteType) {
  if (!id || !email || !name) {
    return { message: "잘못된 정보입니다." };
  }
  const client = await connectDatabase();
  try {
    const db = client.db();
    const query = { _id: id, email: email, name: name };
    const result = await db.collection(collectionAllProducts).deleteOne(query);
    if (result.deletedCount === 1) {
      return { status: 200, message: "삭제되었습니다." };
    } else {
      return { status: 404, message: "삭제할 항목이 없습니다." };
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}
