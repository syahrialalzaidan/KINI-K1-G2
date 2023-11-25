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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const sortOptions = ['A-Z', 'Z-A'];
  const categoryOptions = ['FoodNBeverage', 'RumahTangga', 'Kecantikan', 'Kesehatan'];

  const sortAndFilterProducts = (order: 'asc' | 'desc') => {
    const filteredProducts = products.filter((product) =>
      product.namaBrg.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? product.jenisBrg === selectedCategory : true)
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const nameA = a.namaBrg.toLowerCase();
      const nameB = b.namaBrg.toLowerCase();
      return order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    return sortedProducts;
  };

  const sortedAndFilteredProducts = sortAndFilterProducts(sortOrder);

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
  }, [cart, dataapi, sortOrder, searchQuery]);

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
    <div className="">
      <Account nama={session?.user?.name} role="Cashier" />

      <div id="cashierHeader" className="flex">
        <div className="text-4xl font-bold mr-24 flex justify-center items-center">
          Cashier
        </div>
        <div>
          {show ? (
            <div>
              <Keranjang
                CartList={cart}
                setCart={setCart}
                setShow={setShow}
                handleCheckout={handleCheckout}
              />
            </div>
          ) : (
            <BiBasket
              className="w-12 h-12 mr-8 ml-16 cursor-pointer"
              onClick={() => setShow(true)}
            />
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Cari barang"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[212px] h-8 px-3 py-2 rounded border-2 border-slate-400 mt-2"
        />

        {/* Sorting dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="w-32 h-8 px-3 py-2 rounded border-2 border-slate-400 mt-2"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option === 'A-Z' ? 'asc' : 'desc'}>
              Sort {option}
            </option>
          ))}
        </select>

        {/* Category dropdown */}
        <select
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="w-32 h-8 px-3 py-2 rounded border-2 border-slate-400 mt-2"
        >
          <option value="">All Categories</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      

      <div className="flex gap-4 mt-8">
        <div className={`flex flex-wrap gap-4 ${show?"w-[60%]" : ""}`}>
          {sortedAndFilteredProducts.map((productItem) => {
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

      </div>
    </div>
  );
}
