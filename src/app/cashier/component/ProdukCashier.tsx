"use client";
import Account from "@/components/Account";
import Keranjang from "@/components/Keranjang";
import { Transaction, TransactionItem } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BiBasket } from "react-icons/bi";

interface CashierPageProps {
  produk: Array<Object>;
}

interface Product {
  id: string;
  jenisBrg: string;
  namaBrg: string;
  hargaBrg: number;
  stok: number;
  tglTerima: string;
  tglUpdate: string;
  penerima: string;
  image: string;
}

interface ProductListProps {
  products: Product[];
}

interface CartProduct extends Product {
  quantity: number;
}

interface CartListProps {
  CartList: CartProduct[];
}

interface TransactionItemApi {
  name: string;
  qty: number;
  price: number;
}

interface TransactionApi {
  pic: string;
  items: TransactionItemApi[];
  total: number;
  paymentmethod: string;
}

export default function ProdukCashier({ products }: ProductListProps) {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [show, setShow] = useState(false);
  const [dataapi, setDataapi] = useState<TransactionApi>();

  useEffect(() => {
    console.log("USE EFFECT", cart);
    setDataapi({
      pic: session?.user?.name ?? "",
      items: cart.map((item) => ({
        name: item.namaBrg,
        qty: item.quantity,
        price: item.hargaBrg,
      })),
      total: Math.round(
        cart
          .map((item) => item.hargaBrg * item.quantity)
          .reduce((total, value) => total + value, 0) * 1.1
      ),
      paymentmethod: "QRIS",
    });
    console.log("DATA API", dataapi);
  }, [cart, dataapi]);

  const handleCheckout = async () => {
    console.log("CHECKOUT", dataapi);
    const res = await fetch("http://localhost:3000/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataapi),
    });
    if (res.ok) {
      toast.success("Transaksi berhasil");
    } else {
      toast.error("Transaksi gagal");
    }
  };

  return (
    <>
      <Account nama={session?.user?.name} role="Cashier" />
      <div className="flex gap-4 mt-8">
        <div className={`flex flex-wrap gap-4 ${show?"w-[60%]" : ""}`}>
          {products.map((productItem) => {
            return (
              <div className="flex">
                <div
                  id="product"
                  className="w-[168px] h-[280px] p-5 mr-10 relative bg-white rounded-lg shadow"
                >
                  <img
                    src={productItem.image}
                    className="w-32 h-32 justify-center items-center inline-flex"
                  />
                  <p className="text-slate-400 text-base font-bold leading-tight mt-[11px] text-center">
                    {productItem.namaBrg}
                  </p>
                  <p className="text-black text-xs font-normal leading-[18px] mt-[6px] text-center">
                    Rp
                    {new Intl.NumberFormat("id-ID", {
                      minimumFractionDigits: 2,
                    }).format(productItem.hargaBrg)}
                  </p>
                  <button
                    className="w-32 h-8 px-3 py-2 rounded border-2 border-slate-400 justify-center items-center gap-1 inline-flex mt-[11px]"
                    onClick={() => {
                      if (cart.find((item) => item.id === productItem.id)) {
                        setCart(
                          cart.map((item) =>
                            item.id === productItem.id
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                          )
                        );
                      } else {
                        setCart([
                          ...cart,
                          {
                            ...productItem,
                            quantity: 1,
                          },
                        ]);
                      }
                    }}
                  >
                    <p className="text-slate-400 text-[9px] font-medium leading-[15px]">
                      Tambah ke Keranjang
                    </p>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {show ? (
          <div className="">
            <Keranjang
              CartList={cart}
              setCart={setCart}
              setShow={setShow}
              handleCheckout={handleCheckout}
            />
          </div>
        ) : (
          <BiBasket
            className="w-24 h-24 mr-8 cursor-pointer"
            onClick={() => setShow(true)}
          />
        )}
      </div>
    </>
  );
}
