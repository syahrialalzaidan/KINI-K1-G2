import Account from "@/components/Account";
import Search from "@/components/products/Search";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function WarehousePage({ searchParams }: any) {
    const searchText = searchParams.q
    const session = await getServerSession(authOptions)
    const user = session?.user

    return (
        <div className="font-noto max-w-md mx-auto overflow-hidden sm:max-w-screen-lg sm:ml-6 pt-4">
            <div className="">
                <Account 
                    nama={user?.name}
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