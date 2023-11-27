"use client"

import useSWR from "swr";
import { Produk } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { ProdukProps } from "@/types";
import ProductCard from "@/components/products/ProductCard";

const fetchSearch = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error("Failed to fetch search")
    }
    return res.json()
}

export default function SearchPage() {
    const search = useSearchParams()
    const searchQuery = search ? search.get("q"): null
    const encodedSearchQuery = encodeURI(searchQuery || "")
    const {data} = useSWR<{products: ProdukProps[]}>(`/api/product/search?q=${encodedSearchQuery}`, fetchSearch)

    if (!data?.products) {
        return null
    }

    console.log(data.products)

    const isDataEmpty  = !Array.isArray(data.products) || data.products.length < 1 || !data.products

    const filteredFNB = data.products.filter((item: ProdukProps) => item.jenisBrg === "FoodNBeverage")
    const filteredKEC = data.products.filter((item: ProdukProps) => item.jenisBrg === "Kecantikan")
    const filteredKES = data.products.filter((item: ProdukProps) => item.jenisBrg === "Kesehatan")
    const filteredRUM = data.products.filter((item: ProdukProps) => item.jenisBrg === "RumahTangga")

    const isFNBEmpty  = !Array.isArray(filteredFNB) || filteredFNB.length < 1 || !filteredFNB
    const isKECEmpty  = !Array.isArray(filteredKEC) || filteredKEC.length < 1 || !filteredKEC
    const isKESEmpty  = !Array.isArray(filteredKES) || filteredKES.length < 1 || !filteredKES
    const isRUMEmpty  = !Array.isArray(filteredRUM) || filteredRUM.length < 1 || !filteredRUM

  return (
    <div>
        <div className="pt-8 sm:pt-0">
            {!isDataEmpty ? (
                <section className="sm:mt-10">
                    <div>
                        <h1 className="font-bold text-xl mt-2">Food and Beverage</h1>
                        {!isFNBEmpty ? (
                            <div className="md:flex-row overflow-y-auto md:flex md:gap-10">
                                {filteredFNB?.map((produk) => (
                                    <div key={produk.id}>
                                        <ProductCard produks={produk} />
                                    </div>
                                ))}
                            </div>
                        ): (
                            <div className="text-center pt-6 sm:pt-16">
                                <h2 className="text-xl font-bold">Empty products</h2>
                                <p>Please add new product</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="font-bold text-xl mt-2">Kecantikan</h1>
                        {!isKECEmpty ? (
                            <div className="md:flex-row overflow-y-auto md:flex md:gap-10">
                                {filteredKEC?.map((produk) => (
                                    <div key={produk.id}>
                                        <ProductCard produks={produk} />
                                    </div>
                                ))}
                            </div>
                        ): (
                            <div className="text-center pt-6 sm:pt-16">
                                <h2 className="text-xl font-bold">Empty products</h2>
                                <p>Please add new product</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="font-bold text-xl mt-2">Kesehatan</h1>
                        {!isKESEmpty ? (
                            <div className="md:flex-row overflow-y-auto md:flex md:gap-10">
                                {filteredKES?.map((produk) => (
                                    <div key={produk.id}>
                                        <ProductCard produks={produk} />
                                    </div>
                                ))}
                            </div>
                        ): (
                            <div className="text-center pt-6 sm:pt-16">
                                <h2 className="text-xl font-bold">Empty products</h2>
                                <p>Please add new product</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="font-bold text-xl mt-2">Rumah Tangga</h1>
                        {!isRUMEmpty ? (
                            <div className="md:flex-row overflow-y-auto md:flex md:gap-10">
                                {filteredRUM?.map((produk) => (
                                    <div key={produk.id}>
                                        <ProductCard produks={produk} />
                                    </div>
                                ))}
                            </div>
                        ): (
                            <div className="text-center pt-6 sm:pt-16">
                                <h2 className="text-xl font-bold">Empty products</h2>
                                <p>Please add new product</p>
                            </div>
                        )}
                    </div>
                </section>
            ): (
                <div className="text-center pt-6 sm:pt-16">
                    <h2 className="text-xl font-bold">Oops, no results</h2>
                    <p>Please add new product</p>
                </div>
            )}
        </div>
    </div>
  )
}
