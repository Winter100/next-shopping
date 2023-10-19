import AddProcuct from "@/app/_components/Product/Addproduct";
import { myGetServerSession } from "@/app/_lib/getSession";

export default async function NewproductPage() {
  await myGetServerSession();

  return <AddProcuct editData={null} method="POST" />;
}
