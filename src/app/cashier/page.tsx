'use client';
import Keranjang from "@/components/Keranjang"
import ProductList from '@/components/ProductList'
import Searchbar from "@/components/Searchbar";
import { useState } from 'react';

export default function CashierPage() {
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
    
    const [product, setProduct] = useState([
        {
            url: 'https://dagingnesia.id/wp-content/uploads/2021/04/Dada-Fillet-1-kg.jpg',
            name: 'Ayam Fillet Dada',
            category: 'Makanan',
            price: 24000
        },
        {
            url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//121/MTA-49899469/coca-cola_coca-cola-can-250-ml_full01.jpg',
            name: 'Coca Cola',
            category: 'Minuman',
            price: 12000
        }
    ])

    const [cart, setCart] = useState([])
    console.log(cart)
    const [showCart, setShowCart] = useState(false)

    const addToCart = (data) => {
        console.log(data)
        setCart([...cart, {...data, quantity: 1}])
    }

    return (
        <div>
            <div className='w-[792px] mt-[109px] ml-[248px]'>
                <div id='cashierHeader' className='flex justify-between mb-16'>
                    <h1 className='text-6xl font-bold'>Catalog</h1>
                    <div id='transactionNumber' className='h-[72px] w-[376px] bg-slate-400 bg-opacity-25 rounded-lg border-2 border-cyan-700 flex items-center justify-center'>
                        <h2 className='text-2xl font-bold text-center text-cyan-700'>Transaksi #1234</h2>
                    </div>
                </div>
                <Searchbar></Searchbar>
                <div className='mt-24'>
                    <ProductList product={product} addToCart={addToCart}></ProductList> 
                </div>
            </div>
            
        </div>

    )
}