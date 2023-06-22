import { MongoClient } from "mongodb";
import { collectionAllProducts, collectionUsers } from "./collectionName";
import { ProductsType } from "../type/type";

export async function connectDatabase() {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.NEXT_PUBLIC_MONGODB_NAME}:${process.env.NEXT_PUBLIC_MONGODB_PASSWORD}@cluster0.bj3zudb.mongodb.net/?retryWrites=true&w=majority`
    );
    return client;
  } catch (error) {
    console.log("몽고 DB연결 중 에러");
  }
}

export async function checkEmail(checkValue: string) {
  const client = await connectDatabase();
  try {
    const db = client.db();

    const existingMail = await db.collection(collectionUsers).findOne({
      email: checkValue,
    });

    if (existingMail) {
      return { message: "이미 가입된 메일입니다." };
    }

    return;
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

    const existingName = await db.collection(collectionUsers).findOne({
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

export async function getDetailProduct(id: any) {
  const client = await connectDatabase();
  try {
    const db = client.db();

    const query = { _id: id };
    const response = await db.collection(collectionAllProducts).findOne(query);

    if (!response) {
      return { status: 404, message: "존재하지 않는 상품입니다." };
    }

    const {
      selectedValue,
      date,
      title,
      name,
      price,
      imageSrc,
      _id,
      email,
      description,
    } = response;

    const data: ProductsType = {
      title,
      name,
      price,
      imageSrc,
      email,
      description,
      _id,
      selectedValue,
      date,
    };

    return data;
  } catch (error) {
    console.log(error);
    return { message: "에러발생!" };
  } finally {
    client.close();
  }
}

export async function getAllProducts() {
  const client = await connectDatabase();
  try {
    const db = client.db();
    const projection = {
      title: 1,
      price: 1,
      date: 1,
      name: 1,
      _id: 1,
      imageSrc: 1,
    };
    const documents = await db
      .collection(collectionAllProducts)
      .find({}, { projection })
      .toArray();

    const transFormedData = documents.map((item) => {
      const dateObj = new Date(item.date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();

      return {
        title: item.title,
        price: item.price,
        date: { year, month, day },
        name: item.name,
        _id: item._id,
        imageSrc: item.imageSrc,
      };
    });

    return transFormedData;
  } catch (e) {
    throw new Error("모든 데이터 조회중 오류");
  } finally {
    client.close();
  }
}

export async function getUserInfo(id: string) {}

export async function getMyProducts(email: string, name: string) {
  const client = await connectDatabase();
  try {
    const db = client.db();
    const query = { email: email, name: name };

    const response = await db
      .collection(collectionAllProducts)
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

    const response = await db.collection(collectionUsers).findOne(query);

    if (!response) {
      return { message: "존재하지 않는 사용자입니다." };
    }

    const wishlist = response.wishlist || [];

    const wishlistExists = wishlist.includes(productId);

    if (wishlistExists) {
      await db.collection(collectionUsers).updateOne(query, {
        $pull: { wishlist: productId },
      });
      return { message: "Wishlist에서 제거되었습니다." };
    } else {
      await db.collection(collectionUsers).updateOne(query, {
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

    const response = await db.collection(collectionUsers).findOne(query);

    if (!response) {
      return { message: "존재하지 않는 사용자입니다." };
    }

    const wishlist = response.wishlist || [];

    const updatedWishlist = wishlist.filter(
      (productId: string) => !ids.includes(productId)
    );

    await db.collection(collectionUsers).updateOne(query, {
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
    const userCollection = db.collection(collectionUsers);
    const allProductsCollection = db.collection(collectionAllProducts);

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

export async function checkMyWishList(userEmail: string, id: string) {
  const client = await connectDatabase();
  try {
    const db = client.db();
    const userCollection = db.collection(collectionUsers);

    const user = await userCollection.findOne({ email: userEmail });

    if (user && user.wishlist && user.wishlist.length > 0) {
      const wishlistIds = user.wishlist;

      return wishlistIds.includes(id);
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    client.close();
  }
}