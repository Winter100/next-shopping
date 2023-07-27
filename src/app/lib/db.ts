import { MongoClient } from "mongodb";
import { ProductsType } from "../type/type";
import { transFormedData } from "./utill";

const mongodbName = process.env.NEXT_PUBLIC_MONGODB_NAME;
const mognodbPassword = process.env.NEXT_PUBLIC_MONGODB_PASSWORD;
const productsCollection = process.env.NEXT_PUBLIC_DATABASE_COL_PRODUCTS;
const usersCollection = process.env.NEXT_PUBLIC_DATABASE_COL_USERS;

export async function connectDatabase() {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${mongodbName}:${mognodbPassword}@cluster0.bj3zudb.mongodb.net/?retryWrites=true&w=majority`
    );
    return client;
  } catch (error) {
    console.log(error);
    console.log("몽고 DB연결 중 에러");
  }
}

export async function checkEmail(checkValue: string) {
  const client = await connectDatabase();
  try {
    const db = client.db();
    const existingMail = await db.collection(usersCollection).findOne({
      email: checkValue,
    });

    if (existingMail) {
      return { message: "이미 생성된 이메일입니다." };
    }

    return false;
  } catch (error) {
    console.log("이메일 중복확인 중 에러", error);
  } finally {
    client.close();
  }
}

export async function checkName(checkValue: string) {
  const client = await connectDatabase();
  try {
    const db = client.db();

    const existingName = await db.collection(usersCollection).findOne({
      name: checkValue,
    });

    if (existingName) {
      return { message: "이미 생성된 닉네임입니다." };
    }

    return;
  } catch (error) {
    console.log("닉네임 중복확인 중 에러", error);
  } finally {
    client.close();
  }
}

export async function getDetailProduct(productid: any) {
  const client = await connectDatabase();
  try {
    const db = client.db();

    const query = { _id: productid };
    const response = await db.collection(productsCollection).findOne(query);

    if (!response) {
      return { status: 404, message: "존재하지 않는 상품입니다." };
    }

    const {
      selectedValue,
      date,
      title,
      name,
      price,
      mainImageSrc,
      subImageSrc,
      _id,
      email,
      description,
      contact,
      soldout,
    } = response;

    const data: ProductsType = {
      title,
      name,
      price,
      mainImageSrc,
      subImageSrc,
      email,
      description,
      _id,
      selectedValue,
      date,
      contact,
      soldout,
    };

    return data;
  } catch (error) {
    console.log(error);
    return { message: "에러발생!" };
  } finally {
    client.close();
  }
}

export async function getAllProducts(pageNumber: number) {
  const client = await connectDatabase();
  try {
    const db = client.db();
    const projection = {
      title: 1,
      price: 1,
      date: 1,
      name: 1,
      _id: 1,
      mainImageSrc: 1,
      subImageSrc: 1,
      soldout: 1,
    };
    const itemsPerPage = 20;
    const skipItems = (pageNumber - 1) * itemsPerPage;

    const documents = await db
      .collection(productsCollection)
      .find({}, { projection })
      .sort({ date: -1 })
      .skip(skipItems)
      .limit(itemsPerPage)
      .toArray();

    const transData = await transFormedData(documents);

    return transData;
  } catch (e) {
    throw new Error("모든 제품가져오기 실패!");
  } finally {
    client.close();
  }
}

export async function getSearchProducts(search: string) {
  const client = await connectDatabase();
  try {
    const db = client.db();

    const regexSearch = new RegExp(search, "i");
    const query = { title: { $regex: regexSearch } };

    const documents = await db
      .collection(productsCollection)
      .find(query)
      .toArray();

    const transData = await transFormedData(documents);

    return transData;
  } catch (e) {
    console.log(e);
    throw new Error("검색실패");
  } finally {
    client.close();
  }
}

export async function getMyProducts(email: string, name: string) {
  const client = await connectDatabase();
  try {
    const db = client.db();
    const query = { email: email, name: name };

    const response = await db
      .collection(productsCollection)
      .find(query)
      .toArray();

    return response;
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
}

export async function addMyWishList(
  email: string,
  name: string,
  productId: string
) {
  const client = await connectDatabase();

  try {
    const db = client.db();
    const query = { email, name };

    const response = await db.collection(usersCollection).findOne(query);

    if (!response) {
      return { message: "존재하지 않는 사용자입니다." };
    }

    const wishlist = response.wishlist || [];

    const wishlistExists = wishlist.includes(productId);

    if (wishlistExists) {
      await db.collection(usersCollection).updateOne(query, {
        $pull: { wishlist: productId },
      });
      return { message: "Wishlist에서 제거되었습니다." };
    } else {
      await db.collection(usersCollection).updateOne(query, {
        $push: { wishlist: productId },
      });
      return { message: "Wishlist에 추가되었습니다." };
    }
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

export async function deleteMyWishList(
  ids: string[],
  email: string,
  name: string
) {
  const client = await connectDatabase();
  try {
    const db = client.db();
    const query = { email, name };

    const response = await db.collection(usersCollection).findOne(query);

    if (!response) {
      return { message: "존재하지 않는 사용자입니다." };
    }

    const wishlist = response.wishlist || [];

    const updatedWishlist = wishlist.filter(
      (productId: string) => !ids.includes(productId)
    );

    await db.collection(usersCollection).updateOne(query, {
      $set: { wishlist: updatedWishlist },
    });

    return { message: "선택한 항목이 Wishlist에서 제거되었습니다." };
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

export async function getMyWishList(userEmail: string) {
  const client = await connectDatabase();
  try {
    const db = client.db();
    const userCollection = db.collection(usersCollection);
    const allProductsCollection = db.collection(productsCollection);

    const user = await userCollection.findOne({ email: userEmail });

    if (user && user.wishlist && user.wishlist.length > 0) {
      const wishlistIds = user.wishlist;

      const wishlistProducts = await allProductsCollection
        .find({ _id: { $in: wishlistIds } })
        .toArray();

      return wishlistProducts;
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    client.close();
  }
}

export async function getMywishListId(userEmail: string) {
  const client = await connectDatabase();
  try {
    const db = client.db();
    const userCollection = db.collection(usersCollection);

    const user = await userCollection.findOne({ email: userEmail });

    if (user && user.wishlist && user.wishlist.length > 0) {
      const wishlistIds = user.wishlist;

      return wishlistIds;
    }

    return [];
  } catch (error) {
    console.log(error);
    return;
  } finally {
    client.close();
  }
}

export async function soldOutProduct(id: any, email: string, name: string) {
  const client = await connectDatabase();
  try {
    const db = client.db();
    const query = { _id: id, email: email, name: name };

    const response = await db
      .collection(productsCollection)
      .updateOne(query, { $set: { soldout: true } });

    if (response.modifiedCount === 0) {
      return { message: "해당 제품이 없습니다", status: 404 };
    }

    return { message: "판매완료처리", status: 200 };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.close();
  }
}
