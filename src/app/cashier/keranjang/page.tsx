'use client';
import Keranjang from "@/components/Keranjang"
import { useState } from 'react';
import ProdukCashier from "../component/ProdukCashier";

export default function KeranjangPage() {

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