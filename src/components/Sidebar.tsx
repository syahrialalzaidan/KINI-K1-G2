"use client";

import Image from "next/image";
import { BiGroup } from "react-icons/bi";
import { PiNotebookLight } from "react-icons/pi";
import { FiCalendar } from "react-icons/fi";
import { BsBarChart } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { SlBasket } from "react-icons/sl";
import { useState } from "react";
import MenuIcon from "./MenuIcon";

interface SidebarProps {
  role: string;
}

export default function Sidebar(props: SidebarProps) {
  const pathName = usePathname();

    const handleSignOut = async () => {
      await signOut({callbackUrl: "/"});
    };

  const [open, setOpen] = useState(false);

  function primaryColor() {
    if (props.role === "admin") {
      return "bg-ungu-mid";
    } else if (props.role === "warehouse") {
      return "bg-[#FFD4E6]";
    } else {
      return "bg-[#6DADA9]/25";
    }
  }

  function hoverColor() {
    if (props.role === "admin") {
      return "hover:bg-ungu-mid";
    } else if (props.role === "warehouse") {
      return "hover:bg-[#FFD4E6]";
    } else {
      return "hover:bg-[#6DADA9]/25";
    }
  }
  

  return (
    <div>
      <div className="px-[5%] py-8 fixed top-0 left-0 z-50">
        <MenuIcon isOpen={open} handleToggle={() => setOpen((prev) => !prev)} />
      </div>

      <aside
        id="logo-sidebar"
        className={`fixed mt-10 lg:mt-0 top-0 left-0 z-40 w-64 h-screen transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }  sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full py-8 overflow-y-auto bg-white">
          <a className="flex items-center gap-4 font-extrabold italic text-6xl px-9 mb-16">
            KINI
          </a>
          <ul className="font-medium flex flex-col gap-2">
            <li className={`${props.role == "admin" ? "" : "hidden"}`}>
              <label className="px-8 text-black/[0.38] text-xs">Akun</label>
              <a
                href={`/${props.role}`}
                className={`px-8 ${
                  pathName === `/${props.role}` ? "border-l-4" : ""
                } flex items-center gap-3 p-4 text-[#4C4E64]/[0.87] rounded-lg ${
                  pathName === "/admin" ? primaryColor() : ""
                }  group ${hoverColor()}`}
              >
                <BiGroup className="text-2xl" />
                <span className="whitespace-nowrap font-bold">
                  Manage Account
                </span>
              </a>
            </li>
            <li className="">
              <label className="px-8 text-black/[0.38] text-xs ">
                {props.role == "cashier" ? "Belanja" : "Gudang"}
              </label>
              <a
                href={props.role == "cashier"? `/${props.role}` : `/${props.role}/catalogue` } 
                className={`px-8 ${
                  pathName === `/${props.role}/catalogue` ? "border-l-4" : ""
                } flex items-center gap-3 p-4 text-[#4C4E64]/[0.87] rounded-lg ${
                  pathName === `/${props.role}/catalogue` ||
                  pathName == "/cashier" ||
                  props.role == "warehouse"
                    ? primaryColor()
                    : ""
                }  group ${
                  props.role == "warehouse" ? "hidden" : ""
                }} ${hoverColor()}`}
              >
                <PiNotebookLight className="text-2xl" />
                <span className="whitespace-nowrap font-bold">Catalogue</span>
              </a>

            </li>
            <li className={`${props.role == "warehouse" ? "hidden" : ""}`}>
              <label className="px-8 text-black/[0.38] text-xs">
                Transaksi
              </label>
              <a
                href={`/${props.role}/history`}
                className={`px-8 ${
                  pathName === `/${props.role}/history` ? "border-l-4" : ""
                } flex items-center gap-3 p-4 text-[#4C4E64]/[0.87] rounded-lg ${
                  pathName === `/${props.role}/history` ? primaryColor() : ""
                }  group cursor-pointer ${hoverColor()}  `}
              >
                <FiCalendar className="text-2xl" />
                <span className="whitespace-nowrap font-bold">
                  Transaction History
                </span>
              </a>

              <a
                href={`/${props.role}/reports`}
                className={`px-8 ${
                  pathName === `/${props.role}/reports` ? "border-l-4" : ""
                } flex items-center gap-3 p-4 text-[#4C4E64]/[0.87] rounded-lg ${
                  pathName === `/${props.role}/reports` ? primaryColor() : ""
                }  group ${
                  props.role === "admin" ? "" : "hidden"
                } ${hoverColor()} cursor-pointer mt-4`}
              >
                <BsBarChart className="text-2xl" />
                <span className="whitespace-nowrap font-bold">
                  Transaction Report
                </span>
              </a>
            </li>
          </ul>

          <a
            href="/"
            className={`px-8 flex items-center gap-3 mt-16 p-4 text-[#4C4E64]/[0.87] rounded-lg group hover:bg-red-500 hover:text-white`}
            onClick={handleSignOut}
          >
            <MdLogout className="text-2xl" />
            <span className="whitespace-nowrap font-bold">Logout</span>
          </a>
        </div>
      </aside>
    </div>
  );
}
