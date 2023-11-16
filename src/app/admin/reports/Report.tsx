"use client";
import Account from "@/components/Account";
import { useSession } from "next-auth/react";
import { FaFilter, FaSort } from "react-icons/fa";
import Grafik from "./Grafik";
import { useState } from "react";
import Persen from "./Persen";

export default function Report() {
  const { data: session, status } = useSession();
  const [type, setType] = useState("year");
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const data = [
    { name: "FnB", value: 400 },
    { name: "Bathroom Util", value: 300 },
    { name: "House Utilities", value: 300 },
    { name: "Automotives", value: 200 },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const currentMonth = monthNames[currentMonthIndex];
  const currentYear = currentDate.getFullYear();

  return (
    <div>
      <Account nama={session?.user?.name} role="admin" />
      <h1 className="text-4xl font-bold my-6">Transaction Report</h1>
      <div className="mt-10 flex lg:flex-row flex-col gap-4 w-full lg:w-[90%] justify-between items-center">
        <h1 className="font-bold text-lg lg:text-2xl transform-all">
          {type == "year" ? currentYear : currentMonth} Sales (in mio. Rupiah)
        </h1>
        <div className="flex gap-4 w-full lg:w-1/3">
          <button
            onClick={() => {
              setType("year");
            }}
            className={`rounded-md p-3 w-1/2 ${
              type == "year"
                ? "bg-ungu text-white"
                : "bg-white shadow-xl text-ungu"
            } `}
          >
            Per Year
          </button>
          <button
            onClick={() => {
              setType("month");
            }}
            className={`rounded-md p-3 w-1/2 ${
              type == "month"
                ? "bg-ungu text-white"
                : "bg-white shadow-xl text-ungu"
            }`}
          >
            Per Month
          </button>
        </div>
      </div>

      <div className="mt-6">
        <Grafik type={type} />
      </div>

      <div className="mt-10">
        <h1 className="font-bold text-lg lg:text-2xl">Sales Distibution</h1>
        <div className="mt-4 flex gap-4 flex-wrap justify-center w-full">
            <div
              className="flex flex-col items-center justify-center"
            >
              <div className={`h-4 w-24 rounded-sm bg-[#0088FE]`}></div>
              <p>{data[0].name}</p>
            </div>
            <div
              className="flex flex-col items-center justify-center"
            >
              <div className={`h-4 w-24 rounded-sm bg-[#00C49F]`}></div>
              <p>{data[1].name}</p>
            </div>
            <div
              className="flex flex-col items-center justify-center"
            >
              <div className={`h-4 w-24 rounded-sm bg-[#FFBB28]`}></div>
              <p>{data[2].name}</p>
            </div>
            <div
              className="flex flex-col items-center justify-center"
            >
              <div className={`h-4 w-24 rounded-sm bg-[#FF8042]`}></div>
              <p>{data[3].name}</p>
            </div>
            
            
        </div>

        <Persen />
      </div>
    </div>
  );
}
