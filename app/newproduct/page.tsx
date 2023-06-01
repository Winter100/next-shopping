import { myGetServerSession } from "@/lib/getSession";
import AddProcuct from "../components/AddProcuct";

export default async function NewproductPage() {
  const session = await myGetServerSession();

  return (
    <div>
      <AddProcuct />;
    </div>
  );
}
