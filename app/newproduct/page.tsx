import { myGetServerSession } from "@/lib/getSession";
import AddProcuct from "../components/Product/Addproduct";

export default async function NewproductPage() {
  const session = await myGetServerSession();

  return (
    <div>
      <AddProcuct />;
    </div>
  );
}
