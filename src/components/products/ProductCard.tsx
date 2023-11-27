"use client"

import { ProdukProps } from "@/types"
import ProductDetailsModal from "../modal/ProductDetailsModal"
import useProductDetailsModal from "@/hooks/useProductDetailsModal"

export default function ProductCard({produks}: {produks: ProdukProps}) {
    const detailProduk = useProductDetailsModal()

    return (
        <div className="bg-white mb-10 shadow-lg rounded-lg mt-8 py-5 sm:w-60">
            <ProductDetailsModal />
            <div className="text-center flex justify-center flex-col items-center">
                <div className="flex justify-center relative w-full h-40 object-contain my-3">
                    <img 
                        src={produks.image}
                        alt="product model" 
                        className="object-contain"
                        width={150}
                    />
                </div>
                <h2 className="text-[#DB2777] font-bold text-xl pb-3 sm:text-md">{produks.namaBrg}</h2>
                <div className="text-md rounded-lg flex justify-center gap-1.5 my-1.5 bg-[#FDE9F4] py-2 w-28">
                    <h3 className="font-semibold">Stok: </h3>
                    <p className="font-medium">{produks.stok}</p>
                </div>
                <div className="font-normal text-sm my-4 text-gray-400">
                    <p className="mb-2">Terakhir diperbarui:</p>
                    <p>{produks.tglUpdate.substring(0, 10)} {produks.tglUpdate.substring(12, 16)}</p>
                </div>
                <button 
                    className="bg-pink-500 text-white hover:bg-pink-600 dark:hover:bg-pink-600 h-11 px-8 rounded-xl w-96 mb-2 sm:w-40"
                    onClick={() => {
                        detailProduk.onOpen({
                            ...produks
                        })
                    }}
                >
                    More Detail
                </button>
            </div>
        </div>
    )
}
