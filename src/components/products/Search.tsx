import React, { useState } from "react"
import { IoSearch } from "react-icons/io5";
import CustomFilter from "./CustomFilter";
import Link from "next/link";
import Catalog from "./Catalog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SEARCH_API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/search"

async function searchProduct(searchText: string) {
    const res = await fetch(`${SEARCH_API_URL}?q=${searchText}`)
    const produk = await res.json()
    return produk
}

export default async function Searchbar({searchText}:{ searchText : string }) {
    const results = await searchProduct(searchText)
    const session = await getServerSession(authOptions)
    const user = session?.user

    return (
        <div>
            <div className="xl:bg-white xl:opacity-90 xl:rounded-lg xl:shadow-md px-[5%] xl:h-20 mt-16 xl:flex xl:w-full">
                <form method="GET" className="w-full">
                    <div className="xl:border border-slate-300 xl:opacity-80 mt-4 flex justify-between overflow-hidden rounded-lg">
                        <input 
                            type="text"
                            name="q"
                            className="focus:outline-none w-[400px] sm:w-[620px] h-12 pl-3"
                            placeholder="Cari barang..."
                        />
                        <div className="bg-white h-12 pt-2 xl:opacity-40">
                            <button 
                                type="submit" className="px-3"
                            >
                                <IoSearch size={30} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <button 
                className="bg-pink-500 text-white hover:bg-pink-600 dark:hover:bg-pink-600 h-14 rounded-lg mb-2 mt-8 w-40"
            >
                <Link className="text-center" href={`${user?.role == "warehouse"? "./warehouse/addItems" : "./catalogue/addItems" }`}>Tambah Produk</Link>
            </button>
            <Catalog results={results} />
        </div>
    )
}
