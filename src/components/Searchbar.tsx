"use client";

import SearchBarang from "./SearchBarang"
import React, { useState } from "react"
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";

const SearchButton = () => (
    <button 
    type="submit" className="px-3"
    >
        <IoSearch size={30} />
    </button>
)

export default function Searchbar() {
    const [barang, setBarang] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(barang === "") {
            return alert("Please fill in the search bar")
        }

        updateSearchParams(barang.toLowerCase())
    }

    const updateSearchParams = (barang: string) => {
        const searchParams = new URLSearchParams(window.location.search);

        if (barang) {
            searchParams.set("barang", barang)
        } else {
            searchParams.delete("barang")
        }

        const newPathName = `${window.location.pathname} ? ${searchParams.toString()}`

        router.push(newPathName)
    }

    return (
        <form onSubmit={handleSearch}>
            <div className="flex max-w-md mx-auto overflow-hidden rounded-lg sm:max-w-screen-lg">
                <SearchBarang 
                    barang = {barang}
                    setBarang = {setBarang}
                />
                <div className="self-start bg-white h-12 pt-2">
                    <SearchButton />
                </div>
            </div>
        </form>
    )
}