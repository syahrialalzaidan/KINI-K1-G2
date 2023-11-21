import { prisma } from "@/lib/prisma";
import History from "./History";

export default async function AdminHistory() {

  const transaction = await prisma.transaction.findMany({
    include: {
      items : true
    }
  });

  return (
    <div>
      <History transaction = {transaction} />
    </div>
  );
}
