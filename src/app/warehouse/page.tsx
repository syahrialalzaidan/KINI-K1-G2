"use client"

import Account from "@/components/Account";
import Catalog from "@/components/products/Catalog";
import CustomFilter from "@/components/products/CustomFilter";
import Searchbar from "@/components/products/Searchbar";
import { useRouter } from "next/navigation";

export default function WarehousePage() {
    const router = useRouter()

    return (
        <div className="font-noto max-w-md mx-auto overflow-hidden sm:max-w-screen-lg sm:ml-96 pt-4">
            <div className="">
                <Account 
                    nama="Iyal"
                    role="warehouse"
                />
            </div>

            <div className="mt-12">
                <h1 className="text-4xl font-bold">Catalog</h1>
                <h2 className='mt-4 -mb-4 text-md text-slate-500'>Catalog</h2>
            </div>
            
            <div className="xl:bg-white xl:opacity-90 xl:rounded-lg xl:shadow-md xl:mr-20 xl:h-20 mt-16 xl:flex">
                <Searchbar />
                <div className="text-sm flex justify-start gap-8 pt-6 xl:pt-0">
                    <div className="pt-3 xl:pt-4 xl:ml-9">
                        <CustomFilter title="Filter" />
                    </div>
                    <div className="pt-3 l:pt-4">
                        <CustomFilter title="Sort" />
                    </div>
                </div>
            </div>
            <button 
                className="bg-pink-500 text-white hover:bg-pink-600 dark:hover:bg-pink-600 h-14 rounded-lg mb-2 mt-8 w-40"
                onClick={() => router.push("/warehouse/addItems")}
            >
                <p className="text-center">Tambah Produk</p>
            </button>
            <Catalog />
        </div>
    )
}