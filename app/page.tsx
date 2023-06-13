import GET from "./api/allproducts/route";
import ProductList from "./components/Product/ProductList";

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
  const data: any = await GET();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data && <ProductList products={data} />}
    </main>
  );
}
