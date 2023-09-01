import { ProductsType } from "../type/type";
import { connectDatabase } from "./db";

const productsCollection = process.env.NEXT_PUBLIC_DATABASE_COL_PRODUCTS;

export async function MongoDbAddProducts(req: ProductsType) {
  const client = await connectDatabase();

  try {
    const { v4: uuidv4 } = require("uuid");
    const id = uuidv4();
    const date = Date.now();

    const db = client.db();

    await db.collection(productsCollection).insertOne({
      date: date,
      soldout: false,
      ...req,
      _id: id,
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
  data: ProductsType,
  email: string,
  name: string
) {
  const client = await connectDatabase();
  try {
    const db = client.db();

    const query = { _id: data._id, email: email, name: name };
    const response = await db.collection(productsCollection).findOne(query);

    if (!response) {
      return { status: 404, message: "권한 또는 제품이 없습니다." };
    }
    const {
      title,
      description,
      price,
      selectedValue,
      mainImageSrc,
      subImageSrc,
      region,
      checkedList,
      contact,
    } = data;

    await db.collection(productsCollection).updateOne(query, {
      $set: {
        title,
        description,
        price,
        selectedValue,
        mainImageSrc,
        subImageSrc,
        region,
        checkedList,
        contact,
      },
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

    const query = { _id: id, email: email, name: name };

    const result = await db.collection(productsCollection).deleteOne(query);

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
