'use client';
import Keranjang from "@/components/Keranjang"
import ProductList from '@/components/ProductList'
import Searchbar from "@/components/Searchbar";
import { useState, useEffect } from 'react';

interface CashierPageProps {
    produk: Array<Object>
}

interface Product {
    id: string,
    jenisBrg: string,
    namaBrg: string,
    hargaBrg: number,
    stok: number,
    tglTerima: string,
    tglUpdate: string,
    penerima: string,
    image: string
}

interface ProductListProps {
    products: Product[]
}

interface CartProduct extends Product {
    quantity: number
}

interface CartListProps {
    CartList: CartProduct[]
}


export default function ProdukCashier({ products }: ProductListProps) {
    const [cart, setCart] = useState<CartProduct[]>([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        console.log("USE EFFECT", cart)
    }, [cart])

    return (
        <div className="flex gap-4">
            <div className='flex flex-wrap gap-4'>
                {
                    products.map((productItem) => {
                        return (
                            <div className="flex">
                                <div id='product' className='w-[168px] min-h-[261px] p-5 mr-10 relative bg-white rounded-lg shadow'>
                                    <img src={productItem.image} className='w-32 justify-center items-center inline-flex' />
                                    <p className='text-slate-400 text-base font-bold leading-tight mt-[11px] text-center'>{productItem.namaBrg}</p>
                                    <p className='text-black text-xs font-normal leading-[18px] mt-[6px] text-center'>Rp{new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2 }).format(productItem.hargaBrg)}</p>
                                    <button className="w-32 h-8 px-3 py-2 rounded border-2 border-slate-400 justify-center items-center gap-1 inline-flex mt-[11px]"
                                        onClick={() =>
                                            setCart((prevCart) => [
                                                ...prevCart,
                                                {
                                                    ...productItem,
                                                    quantity: 1,
                                                }
                                            ])
                                            // Tambahin buat ngehandle kalo semisalnya ada barang yang sama yang ditambah
                                        }
                                    >
                                        <p className="text-slate-400 text-[9px] font-medium leading-[15px]">Tambah ke Keranjang</p>
                                    </button>
                                    <div className={`${show ? "block" : "hidden"}`}>
                                        <Keranjang CartList={cart} setCart={setCart}  setShow={setShow}  />
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            <button onClick={() => setShow(true)}>
                keranjang
            </button>
        </div>

    )
}