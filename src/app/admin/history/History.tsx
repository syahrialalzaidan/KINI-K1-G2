"use client";
import Account from "@/components/Account";
import { useSession } from "next-auth/react";
import { FaFilter, FaSort } from "react-icons/fa";

export default function History() {
  const { data: session, status } = useSession();

  return (
    <div>
      <Account nama={session?.user?.name} role="admin" />
      <h1 className="text-4xl font-bold my-6">Transaction History</h1>

      <div className="flex justify-start flex-row gap-6">
        <div className="flex rounded-lg px-2 bg-ungu-mid">
          <FaFilter className="ml-2 text-lg lg:text-2xl text-ungu absolute self-center" />
          <select
            className= "bg-transparent focus:outline-none focus:border-none text-ungu flex w-32 lg:w-full py-3 px-7 lg:px-10 gap-2 rounded-lg"
            placeholder="Tanggal"
          >
            <option value="basket">Rp. 0 - Rp.500.000</option>
            <option value="futsal">Rp. 500.000 - Rp.1.000.000</option>
            <option value="badminton">{"> Rp. 1.000.000"}</option>
          </select>
        </div>

        <div className="flex rounded-lg px-2 bg-ungu-mid">
          <FaSort className="ml-2 text-lg lg:text-2xl text-ungu absolute self-center" />
          <select
            className="bg-transparent focus:outline-none focus:border-none text-ungu flex w-32 lg:w-40 py-3 px-7 lg:px-10 gap-2 rounded-lg"
            placeholder="Tanggal"
          >
            <option value="basket">Price</option>
            <option value="futsal">Date</option>
            <option value="badminton">Name</option>
          </select>
        </div>
      </div>

      <table className="mt-8 w-4/5 shadow-lg">
            <thead>
                <tr className="bg-ungu-mid rounded-xl text-ungu">
                    <th className="py-4 px-8 font-medium text-left rounded-tl-xl">Transaction Date</th>
                    <th className="py-4 px-8 font-medium text-left">PIC</th>
                    <th className="py-4 px-8 font-medium text-left">Total Price</th>
                    <th className="py-4 px-8 font-medium text-left">Payment Method</th>
                    <th className="py-4 px-8 font-medium text-left rounded-tr-xl"></th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-gray-100 border-b border-gray-300">
                    <td className="py-4 px-8 text-left">12/12/2021</td>
                    <td className="py-4 px-8 text-left">John Doe</td>
                    <td className="py-4 px-8 text-left">Rp. 1.000.000</td>
                    <td className="py-4 px-8 text-left">Cash</td>
                    <td className="py-4 px-8 text-left">
                        <button className="bg-ungu rounded-md w-28 p-3 text-white">See Detail</button>
                    </td>
                </tr>
                <tr className="bg-gray-100 border-b border-gray-300 ">
                    <td className="py-4 px-8 text-left">12/12/2021</td>
                    <td className="py-4 px-8 text-left">John Doe</td>
                    <td className="py-4 px-8 text-left">Rp. 1.000.000</td>
                    <td className="py-4 px-8 text-left">QRIS</td>
                    <td className="py-4 px-8 text-left">
                        <button className="bg-ungu rounded-md w-28 p-3 text-white">See Detail</button>
                    </td>
                </tr>
            </tbody>
      </table>
    </div>
  );
}
