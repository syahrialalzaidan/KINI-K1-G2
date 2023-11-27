import Account from "@/components/Account";
import Catalog from "@/components/Catalog";
import CustomFilter from "@/components/CustomFilter";
import Searchbar from "@/components/Searchbar";
import Catalog from "@/components/Catalog";
import CustomFilter from "@/components/CustomFilter";
import Searchbar from "@/components/Searchbar";

export default function WarehousePage() {
    return (
        <div className="font-noto max-w-md mx-auto overflow-hidden sm:max-w-screen-lg sm:ml-96 pt-4">
            <div className="sm:pr-5">
                <Account 
                    nama="Iyal"
                    role="warehouse"
                />
            </div>

            <div className="mt-12">
                <h1 className="text-4xl font-bold">Catalog</h1>
            </div>
            
            <div className="mt-16 xl:flex">
                <Searchbar />
                <div className="text-sm flex justify-start gap-8 pt-6 xl:pt-0">
                    <div className="pt-3 xl:ml-9 xl:pt-1">
                        <CustomFilter title="Filter" />
                    </div>
                    <div className="pt-3 xl:pt-1">
                        <CustomFilter title="Sort" />
                    </div>
                </div>
            </div>
            <a className="sm:-mb-20">
                <button className="bg-pink-500 text-white hover:bg-pink-600 dark:hover:bg-pink-600 h-14 rounded-lg mb-2 mt-8 w-40 ">
                    <p className="text-center">Tambah Produk</p>
                </button>
            </a>
            <Catalog />
        </div>
    )
}