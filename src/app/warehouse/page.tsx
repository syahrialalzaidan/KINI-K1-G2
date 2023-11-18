import Account from "@/components/Account";
import CustomFilter from "@/components/CustomFilter";
import Searchbar from "@/components/Searchbar";

export default function WarehousePage() {
    return (
        <div className="max-w-md mx-auto overflow-hidden sm:max-w-screen-lg sm:ml-96 pt-4">
            <div className="sm:pr-5">
                <Account 
                    nama="Iyal"
                    role="warehouse"
                />
            </div>

            <div className="font-noto mt-12">
                <h1 className="text-4xl font-bold">Catalog</h1>
            </div>
            
            <div className="xl:flex mt-16">
                <Searchbar />
                <div className="flex flex-row gap-10 pt-12 xl:pt-0">
                    <div className="xl:ml-12 xl:pt-3">
                        <CustomFilter title="Filter" />
                    </div>
                    <div className="xl:pt-3">
                        <CustomFilter title="Sort" />
                    </div>
                </div>
            </div>
            <div>
                tambahbarang
            </div>
        </div>
    )
}