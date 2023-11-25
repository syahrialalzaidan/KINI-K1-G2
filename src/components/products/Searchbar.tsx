"use client";

import React, { useState } from "react"
import { IoSearch } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import useSWR from "swr";
import { Produk } from "@prisma/client";

const SearchButton = () => (
    <button 
    type="submit" className="px-3"
    >
        <IoSearch size={30} />
    </button>
)

export default function Searchbar() {
    const search = useSearchParams()

    const [barang, setBarang] = useState(search ? search.get("q"): null);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const encodedSearchBarang = encodeURI(barang || "")
        router.push(`/warehouse/search?q=${encodedSearchBarang}`)

        
    }

    // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()

    //     if(barang === "") {
    //         return toast.error("Please fill in the search bar")
    //     }

    //     updateSearchParams(barang.toLowerCase())
    // }

    // const updateSearchParams = (barang: string) => {
    //     const searchParams = new URLSearchParams(window.location.search);

    //     if (barang) {
    //         searchParams.set("barang", barang)
    //     } else {
    //         searchParams.delete("barang")
    //     }

    //     const newPathName = `${window.location.pathname} ? ${searchParams.toString()}`

    //     router.push(newPathName)
    // }

    return (
        <form onSubmit={handleSearch}>
            <div className="xl:border border-slate-300 xl:opacity-40 mt-3 xl:ml-4 flex max-w-md mx-auto overflow-hidden rounded-lg sm:max-w-screen-lg">
                <input 
                    className="w-[400px] sm:w-[550px] h-12 pl-3 search-manufactur__input"
                    placeholder="Cari barang..."
                    value={barang || ""}
                    onChange={(e) => setBarang(e.target.value)}
                />
                <div className="self-start bg-white h-12 pt-2">
                    <SearchButton />
                </div>
            </div>
        </form>
    )
}
