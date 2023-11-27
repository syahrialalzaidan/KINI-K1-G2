import Account from "@/components/Account";
import Search from "@/components/products/Search";
import { useSession } from "next-auth/react";

export default function WarehousePage({ searchParams }: any) {
    const searchText = searchParams.q

    return (
        <div className="font-noto max-w-md mx-auto overflow-hidden sm:max-w-screen-lg sm:ml-6 pt-4">
            <div className="">
                <Account 
                    nama="Iyal"
                    role="Warehouse"
                />
            </div>

            <div className="mt-12">
                <h1 className="text-4xl font-bold">Catalog</h1>
                <h2 className='mt-4 -mb-4 text-md text-slate-500'>Catalog</h2>
            </div>
            <Search searchText={searchText} />
        </div>
    )
}