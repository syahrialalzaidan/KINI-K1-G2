"use client";
import Account from "@/components/Account";
import { useSession } from "next-auth/react";
import { FaFilter, FaSort } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DetailTransaksiModal from "@/components/modal/DetailTransaksiModal";
import useDetailTransaksiModal from "@/hooks/useDetailTransaksiModal";
import { Transaction, TransactionItem } from "@prisma/client";

interface TransactionWithItems extends Transaction {
  items: TransactionItem[];
}

interface HistoryProps {
  transaction: TransactionWithItems[];
}

export default function History(props: HistoryProps) {
  const detailTransaksiModal = useDetailTransaksiModal();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [displaydata, setDisplaydata] = useState(props);
  if (!session) router.push("/");
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const [filterCriteria, setFilterCriteria] = useState<string>("all"); // Add state for filter criteria
  const [sortCriteria, setSortCriteria] = useState<string>("date"); // Add state for sort criteria

  // Function to filter transactions based on payment method
  const filterTransactions = (
    transactions: TransactionWithItems[]
  ): TransactionWithItems[] => {
    if (filterCriteria === "all") {
      return transactions;
    } else {
      return transactions.filter(
        (transaction) =>
          transaction.paymentmethod.toLowerCase() === filterCriteria
      );
    }
  };

  // Function to sort transactions based on selected criteria
  const sortTransactions = (
    transactions: TransactionWithItems[]
  ): TransactionWithItems[] => {
    switch (sortCriteria) {
      case "date":
        return transactions.sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        );
      case "price":
        return transactions.sort((a, b) => a.total - b.total);
      case "name":
        return transactions.sort((a, b) => a.pic.localeCompare(b.pic));
      default:
        return transactions;
    }
  };

  const filteredAndSortedTransactions = sortTransactions(
    filterTransactions(props.transaction)
  );

  // Function to handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCriteria(event.target.value);
  };

  // Function to handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value);
  };

  return (
    <>
      <DetailTransaksiModal />
      <div className="max-w-screen">
        <div className="flex justify-end w-full">
          <Account nama={session?.user?.name} role="Cashier" />
        </div>
        <h1 className="text-4xl font-bold my-6">Transaction History</h1>

        <div className="flex justify-start flex-row gap-6">
          {/* Filter dropdown */}
          <div className="flex rounded-lg px-2 bg-[#BFE7E4]">
            <FaFilter className="ml-2 text-lg lg:text-2xl text-[#4A8C87] absolute self-center" />
            <select
              value={filterCriteria}
              onChange={handleFilterChange}
              className="bg-transparent focus:outline-none focus:border-none text-ungu flex w-32 lg:w-full py-3 px-7 lg:px-10 gap-2 rounded-lg"
            >
              <option value="all">All</option>
              <option value="cash">Cash</option>
              <option value="qris">QRIS</option>
            </select>
          </div>

          {/* Sort dropdown */}
          <div className="flex rounded-lg px-2 bg-[#BFE7E4]">
            <FaSort className="ml-2 text-lg lg:text-2xl text-[#4A8C87] absolute self-center" />
            <select
              value={sortCriteria}
              onChange={handleSortChange}
              className="bg-transparent focus:outline-none focus:border-none text-ungu flex w-32 lg:w-40 py-3 px-7 lg:px-10 gap-2 rounded-lg"
            >
              <option value="date">Date</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <table className="mt-8 max-w-screen table-fixed md:w-4/5  shadow-lg overflow-x-scroll">
          <thead className="overflow-x-scroll">
            <tr className="bg-[#BFE7E4] rounded-xl text-[#4A8C87]">
              <th className="py-4 px-8 font-medium text-left rounded-tl-xl">
                Transaction Date
              </th>
              <th className="py-4 px-8 font-medium text-left">PIC</th>
              <th className="py-4 px-8 w-1/5 font-medium text-center">
                Total Price
              </th>
              <th className="py-4 px-8 font-medium text-left">
                Payment Method
              </th>
              <th className="py-4 px-8 font-medium text-left rounded-tr-xl"></th>
            </tr>
          </thead>
          <tbody className="overflow-x-scroll">
            {filteredAndSortedTransactions?.map((item, index) => (
              <tr key={index} className="bg-gray-100 border-b border-gray-300">
                <td className="py-4 px-8 text-left">{`${item.createdAt
                  .toString()
                  .split(" ")
                  .slice(1, 4)
                  .join(" ")
                  .replace(/,/g, " ")}`}</td>
                <td className="py-4 px-8 text-left">{item.pic}</td>
                <td className="py-4 px-8 text-center">
                  {formatCurrency(item.total)}
                </td>
                <td className="py-4 px-8 text-left">{item.paymentmethod}</td>
                <td className="py-4 px-8 text-left">
                  <button
                    className="bg-[#BFE7E4] rounded-md w-28 p-3 text-white"
                    onClick={() => {
                      detailTransaksiModal.onOpen(item.items);
                    }}
                  >
                    See Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
