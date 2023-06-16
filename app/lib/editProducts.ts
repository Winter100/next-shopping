import { ProductsType } from "../type/type";
import { collectionAllProducts } from "./collectionName";
import { connectDatabase } from "./db";

export async function MongoDbAddProducts(req: ProductsType) {
  const client = await connectDatabase();

  try {
    const { v4: uuidv4 } = require("uuid");
    const id = uuidv4();
    const date = Date.now();

    const db = client.db();

    await db.collection(collectionAllProducts).insertOne({
      _id: id,
      date: date,
      ...req,
    });

    return { status: 201, message: "등록성공" };
  } catch (error) {
    console.log(error);
    return { message: "에러발생!" };
  } finally {
    client.close();
  }
}

export async function MongoDbEditProducts(
  req: ProductsType,
  email: string,
  name: string
) {
  const client = await connectDatabase();
  try {
    const db = client.db();

    const query = { _id: req._id, email: email, name: name };
    const response = await db.collection(collectionAllProducts).findOne(query);

    if (!response) {
      return { status: 404, message: "권한 또는 제품이 없습니다." };
    }
    const { title, description, price, selectedValue, imageSrc } = req;

    await db.collection(collectionAllProducts).updateOne(query, {
      $set: { title, description, price, selectedValue, imageSrc },
    });

    return { status: 200, message: "등록제품 수정 성공" };
  } catch (error) {
    console.log(error);
    return { message: "에러발생!" };
  } finally {
    client.close();
  }
}

export async function MongoDbDeleteProducts(
  id: any,
  email: string,
  name: string
) {
  const client = await connectDatabase();
  try {
    const db = client.db();

    const query = { _id: id.id, email: email, name: name };

    const result = await db.collection(collectionAllProducts).deleteOne(query);

    if (result.deletedCount === 1) {
      return { status: 200, message: "삭제되었습니다." };
    } else {
      return { status: 404, message: "권한 또는 삭제할 제품이 없습니다." };
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}
