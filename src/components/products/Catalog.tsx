import ProductCard from "./ProductCard"
import { ProdukProps } from "@/types"

export const getCatalog = async() => {
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

export default async function Catalog() {
    const products = await getCatalog()
    const isDataEmpty  = !Array.isArray(products) || products.length < 1 || !products

    const arrProducts: ProdukProps[] = products

    const filteredFNB = arrProducts.filter((item: ProdukProps) => item.jenisBrg === "FoodNBeverage")
    const filteredKEC = arrProducts.filter((item: ProdukProps) => item.jenisBrg === "Kecantikan")
    const filteredKES = arrProducts.filter((item: ProdukProps) => item.jenisBrg === "Kesehatan")
    const filteredRUM = arrProducts.filter((item: ProdukProps) => item.jenisBrg === "RumahTangga")

    const isFNBEmpty  = !Array.isArray(filteredFNB) || filteredFNB.length < 1 || !filteredFNB
    const isKECEmpty  = !Array.isArray(filteredKEC) || filteredKEC.length < 1 || !filteredKEC
    const isKESEmpty  = !Array.isArray(filteredKES) || filteredKES.length < 1 || !filteredKES
    const isRUMEmpty  = !Array.isArray(filteredRUM) || filteredRUM.length < 1 || !filteredRUM

    return (
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
    )
}
