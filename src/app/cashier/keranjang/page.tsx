'use client';
import Keranjang from "@/components/Keranjang"
import ProductList from '@/components/ProductList'
import { useState } from 'react';

export default function KeranjangPage() {
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
            <Keranjang cart={cart}></Keranjang>
            
        </div>

    )
}