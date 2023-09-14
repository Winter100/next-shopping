import AddProcuct from "../components/Product/Addproduct";
import { myGetServerSession } from "../lib/getSession";

export default async function NewproductPage() {
  await myGetServerSession();

  return (
    <div className="mt-10">
      <AddProcuct editData={null} method="POST" />
    </div>
  );
}
