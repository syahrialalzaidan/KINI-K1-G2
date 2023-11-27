import { prisma } from "@/lib/prisma";
import History from "./History";

export default async function AdminHistory() {

  const transaction = await prisma.transaction.findMany({
    include: {
      items : true
    }
  });

  return (
    <div className="py-8 px-[5%]">
      <History transaction = {transaction} />
    </div>
  );
}
