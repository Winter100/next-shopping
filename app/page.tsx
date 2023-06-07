import { myGetServerSession } from "@/lib/getSession";
import ProductList from "./components/Product/ProductList";

export interface ProductsType {
  title: string;
  id: string;
  imageSrc: string;
  price: string;
  name: string;
  description: string;
}

export default async function Home() {
  const data = await getData();

  const session = myGetServerSession();
  console.log(session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data && <ProductList products={data} />}
    </main>
  );
}

async function getData() {
  const response = await fetch(
    "https://react-post-c4178-default-rtdb.firebaseio.com/shopping/products.json",
    { cache: "no-store" }
  );
  const newArr: ProductsType[] = [];

  const data = await response.json();

  for (const key in data) {
    newArr.push({
      title: data[key].title,
      id: data[key].id,
      imageSrc: data[key].imageSrc,
      name: data[key].name,
      price: data[key].price,
      description: data[key].description,
    });
  }

  return newArr;
}
