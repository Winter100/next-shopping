// import { myGetServerSession } from "@/lib/getSession";
import ProductList from "./components/Product/ProductList";
import GET from "./api/allproducts/route";

export interface ProductsType {
  _id: any;
  title: string;
  description: string;
  price: number;
  selectedValue: {
    random: string;
    isMeet: string;
    bargaining: string;
  };
  imageSrc: string;
  email: string | null | undefined;
  name: string | null | undefined;
  date: {
    year: number;
    month: number;
    day: number;
  };
}

export default async function Home() {
  // const data: any = await getData();
  // const session = myGetServerSession();

  const data: any = await GET();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data && <ProductList products={data} />}
    </main>
  );
}

// async function getData() {
//   const response = await GET();

//   return response;
// }
