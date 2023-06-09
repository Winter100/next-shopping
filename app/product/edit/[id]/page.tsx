import DetailProductsData from "@/app/api/[detailproducts]/route";
import AddProcuct from "@/app/components/Product/Addproduct";
import { myGetServerSession } from "@/lib/getSession";

export default async function EditProductsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await myGetServerSession();

  const id = params.id;
  // const data = (await DetailProductsData(id)) || "";

  return <div>{/* <AddProcuct editData={data} /> */}</div>;
}
