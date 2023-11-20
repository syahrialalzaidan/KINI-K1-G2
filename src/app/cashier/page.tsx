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

    // const [product, setProduct] = useState([
    //     {
    //         url: 'https://dagingnesia.id/wp-content/uploads/2021/04/Dada-Fillet-1-kg.jpg',
    //         name: 'Ayam Fillet Dada',
    //         category: 'Makanan',
    //         price: 24000
    //     },
    //     {
    //         url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//121/MTA-49899469/coca-cola_coca-cola-can-250-ml_full01.jpg',
    //         name: 'Coca Cola',
    //         category: 'Minuman',
    //         price: 12000
    //     }
    // ])

    // const [cart, setCart] = useState([])
    // console.log(cart)
    // const [showCart, setShowCart] = useState(false)

    // const addToCart = (data) => {
    //     console.log(data)
    //     setCart([...cart, {...data, quantity: 1}])
    // }

    return (
        <>
            <ProdukCashier products={produk_get} addToCart={addToCart} />
            <Keranjang cart={cart}></Keranjang>
        </>

    )
}