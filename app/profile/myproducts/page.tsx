import GetMyProductItems from "@/app/api/myproducts/route";
import MyProductsList from "@/app/components/Product/MyProductsList";

export default async function MyProductsPage() {
  const data: any = await GetMyProductItems();

  return <MyProductsList products={data} />;
}
