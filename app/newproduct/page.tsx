import AddProcuct from "../components/Product/Addproduct";
import { myGetServerSession } from "../lib/getSession";

export default async function NewproductPage() {
  const session = await myGetServerSession();

  return (
    <div>
      <AddProcuct editData={null} method="POST" />;
    </div>
  );
}
