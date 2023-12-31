"use client";
import React, { useState, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

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

interface CartProduct extends Product {
  quantity: number;
}

interface CartListProps {
  CartList: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  handleCheckout: () => void;
}

export default function Keranjang({
  CartList,
  setCart,
  setShow,
  handleCheckout,
  setPaymentMethod
}: CartListProps) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = CartList.map(
      (item) => item.hargaBrg * item.quantity
    ).reduce((total, value) => total + value, 0);
    setTotalPrice(newTotalPrice);
  }, [CartList]);

  return (
    <div className="w-[517px] bg-white h-screen fixed right-0 top-0 pl-[22px] py-[65px] pr-[43px] overflow-y-auto">
      {/* katalog - batalkan transaksi */}
      <div className="flex justify-end items-end mb-4">
        <IoClose
          className="text-2xl cursor-pointer"
          onClick={() => setShow(false)}
        />
      </div>

      <div className="justify-between flex mb-[49px]">
        <div className="text-slate-950 text-4xl font-bold font-['Noto Sans'] leading-[45px]">
          Keranjang
        </div>
        <div className="w-[223px] h-11 px-3 py-2.5 bg-red-500 rounded justify-center items-center gap-1 inline-flex">
          <button
            type="button"
            className="text-neutral-50 text-sm font-medium font-['Noto Sans'] leading-[21px]"
            onClick={() => {
              setCart([]);
              setShow(false);
            }}
          >
            Batalkan Transaksi
          </button>
        </div>
      </div>
      {/* barang-barang */}
      <div className="barangList">
        {CartList?.map((cartItem, cartIndex) => {
          return (
            <div
              key={cartIndex}
              className="w-[452px] h-[148px] relative border-b-[2px] border-zinc-200"
            >
              <img
                src={cartItem.image}
                className="w-[106px] h-[106px] left-[29px] top-[21px] absolute"
              />
              <span className="left-[168px] top-[21px] absolute text-black text-2xl font-bold leading-[30px]">
                {cartItem.namaBrg}
              </span>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 left-[168px] top-[103px] absolute">
                  <button
                    id="decreaseQuantity"
                    className="w-6 h-6 relative bg-white rounded-full border border-slate-500"
                    onClick={() => {
                      if (cartItem.quantity === 1) {
                        setCart((prevCart) =>
                          prevCart.filter((item, index) => index !== cartIndex)
                        );
                        return;
                      } else {
                        setCart((prevCart) =>
                          prevCart.map((item, index) =>
                            cartIndex === index
                              ? {
                                  ...item,
                                  quantity: Math.max(1, item.quantity - 1),
                                }
                              : item
                          )
                        );
                      }
                    }}
                  >
                    -
                  </button>
                </div>
                <span className="w-[11px] h-6 left-[208px] top-[103px] absolute text-black text-lg font-normal leading-[27px]">
                  {cartItem.quantity}
                </span>
                <div className="w-6 h-6 left-[235px] top-[103px] absolute">
                  <button
                    id="increaseQuantity"
                    className="w-6 h-6 relative bg-white rounded-full border border-slate-500"
                    onClick={() => {
                      setCart((prevCart) =>
                        prevCart.map((item, index) =>
                          cartIndex === index
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        )
                      );
                    }}
                  >
                    +
                  </button>
                </div>

                <BsTrash
                  className="w-6 h-6 left-[292px] top-[103px] absolute cursor-pointer"
                  onClick={() => {
                    setCart((prevCart) =>
                      prevCart.filter((item, index) => index !== cartIndex)
                    );
                  }}
                />
              </div>

              <span className="left-[168px] top-[55px] absolute text-black text-lg font-normal leading-[27px]">
                Rp
                {new Intl.NumberFormat("id-ID", {
                  minimumFractionDigits: 2,
                }).format(cartItem.hargaBrg * cartItem.quantity)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-2">
        <label className="text-xl mt-6">Payment Method</label>
        <div className="p-1 mt-2 border rounded-lg border-gray-300 w-1/2">
          <select
            className="px-2 py-2 w-full focus:outline-none bg-white rounded justify-start items-center gap-1 inline-flex"
            name="paymentMethod"
            id="paymentMethod"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="CASH">CASH</option>
            <option value="QRIS">QRIS</option>
          </select>
        </div>
      </div>

      <div id="priceLists" className="mt-[38px]">
        <div className="justify-between flex">
          <div className="text-black text-xl font-normal leading-[30px]">
            Subtotal
          </div>
          <div className="text-black text-xl font-normal">
            Rp
            {new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 2,
            }).format(totalPrice)}
          </div>
        </div>
        {/* <div className="justify-between flex mt-[14px]">
          <div className="text-black text-xl font-normal leading-[30px]">
            Potongan
          </div>
          <div className="text-black text-xl font-normal">Rpxx.xxx,00</div>
        </div> */}
        <div className="justify-between flex mt-[14px]">
          <div className="text-black text-xl font-normal leading-[30px]">
            Pajak
          </div>
          <div className="text-black text-xl font-normal">
            Rp
            {new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 2,
            }).format(totalPrice * 0.1)}
          </div>
        </div>
        <div className="justify-between flex mt-[14px]">
          <div className="text-black text-xl font-bold leading-[30px]">
            Total
          </div>
          <div className="text-black text-xl font-bold">
            Rp
            {new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 2,
            }).format(totalPrice + totalPrice * 0.1)}
          </div>
        </div>
      </div>

      {/* button konfirmasi pembayaran */}
      <div className="justify-end mt-[24px] flex">
        <div className="w-[223px] h-11 px-3 py-2.5 bg-cyan-700 rounded justify-center items-center gap-1 inline-flex">
          <button
            type="button"
            className="text-neutral-50 text-sm font-medium font-['Noto Sans'] leading-[21px]"
            onClick={handleCheckout}
          >
            Konfirmasi Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}
