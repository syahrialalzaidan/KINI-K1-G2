import Keranjang from "@/components/Keranjang"
import ProductList from '@/components/ProductList'
import Searchbar from "@/components/Searchbar";
import ProdukCashier from "./component/ProdukCashier";

const getCatalog = async() => {
    try {
        const res = await fetch("http://localhost:3000/api/product", {
            cache: "no-store",
        })

        if (!res.ok) {
            throw new Error("Faile to fetch the catalog")
        }

        return res.json()
    } catch (error) {
        console.log("Error loading catalog: ", error)
    }
}

export default async function CashierPage() {
    const produk_get = await getCatalog()
    // Push 26 November 2023 11.52

    return (
        <>
            <ProdukCashier products={produk_get} />
        </>

    )
}