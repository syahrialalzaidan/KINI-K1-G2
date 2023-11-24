"use client"

import { useState } from "react"
import Image from "next/image"

interface Produk {
    jenisBrg:     string   
    namaBrg:      string        
    hargaBrg:     number
    stok:         number     
    penerima:     string
    image:        string
    tglUpdate:    string
}

let FoodNBeverage = []
let Kesehatan = []
let Kecantikan = []
let RumahTangga = []

export default function ProductCard({produks}:{produks: Produk}) {

    const isFnBEmpty = FoodNBeverage.length < 1
    const isKesehatanEmpty = Kesehatan.length < 1
    const isKecantikanEmpty = Kecantikan.length < 1
    const isRTEmpty = RumahTangga.length < 1

    function getProps() {
        if (produks.jenisBrg === "FoodNBeverage") {
            return FoodNBeverage.push(produks)
        } else if (produks.jenisBrg === "Kesehatan") {
            return Kesehatan.push(produks)
        } else if (produks.jenisBrg === "Kecantikan") {
            return Kecantikan.push(produks)
        } else if (produks.jenisBrg === "RumahTangga") {
            return RumahTangga.push(produks)
        }
    }

    console.log(produks.jenisBrg)

    return (
        <div className="mt-0 sm:mt-24">
            {getProps()}
            {isFnBEmpty || isKesehatanEmpty || isKecantikanEmpty || isRTEmpty ? (
                <h1 className="font-bold text-xl mt-1 sm:-mt-10">{produks.jenisBrg}</h1>
            ): !isFnBEmpty || !isKesehatanEmpty || !isKecantikanEmpty || !isRTEmpty}
            <div className="bg-white mb-10 shadow-lg rounded-lg mt-8 sm:w-60">
                <div className="text-center flex justify-center flex-col items-center">
                    <Image 
                        src="/indomi.png"
                        alt="product model" 
                        className="mt-5"
                        width={150}
                        height={150}
                    />
                    <h2 className="text-[#DB2777] font-bold text-xl pb-3 sm:text-md">{produks.namaBrg}</h2>
                    <div className="text-md rounded-lg flex justify-center gap-1.5 my-1.5 bg-[#FDE9F4] py-2 w-28">
                        <h3 className="font-semibold">Stok: </h3>
                        <p className="font-medium">{produks.stok}</p>
                    </div>
                    <div className="font-normal text-sm my-4 text-gray-400">
                        <p className="mb-2">Terakhir diperbarui:</p>
                        <p>{produks.tglUpdate.substring(0, 10)} {produks.tglUpdate.substring(12, 16)}</p>
                    </div>
                    <button className="bg-pink-500 text-white hover:bg-pink-600 dark:hover:bg-pink-600 h-11 px-8 rounded-xl w-96 mb-2 sm:w-40">
                        More Detail
                    </button>
                </div>
            </div>
        </div>
    )
}
