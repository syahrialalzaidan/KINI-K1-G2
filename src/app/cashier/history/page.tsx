import { prisma } from "@/lib/prisma";
import CashierHistoryContent from "./CashierHistoryContent";


export default async function CashierHistory() {

  const transaction = await prisma.transaction.findMany({
    include: {
      items : true
    }
  });

  return (
    <div>
      <CashierHistoryContent transaction = {transaction} />
    </div>
  );
}
