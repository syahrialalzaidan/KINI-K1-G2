"use client";
import PaymentModal from "@/components/modal/PaymentModal";
import ProductModal from "@/components/modal/ProductModal";
import useAddedProductModal from "@/hooks/useAddedProductModal";
import usePaymentModal from "@/hooks/usePaymentModal";
import Image from "next/image";

export default function Home() {
  const productmodal = useAddedProductModal();
  const paymentmodal = usePaymentModal();
  return (
    <>
      <PaymentModal />
      <ProductModal role="warehouse" text="Product Berhasil Ditambahkan" /> 

      <div className="font-bold text-5xl text-center bg-ungu-mid h-screen flex flex-col gap-4 items-center justify-center">
        <p>KINI</p>
        <div className="flex gap-8">
          <button
            className="p-6 rounded-xl bg-blue-200"
            onClick={() => productmodal.onOpen()}
          >
            Popup Product
          </button>

          <button
            className="p-6 rounded-xl bg-red-200"
            onClick={() => paymentmodal.onOpen()}
          >
            Popup Payment
          </button>
        </div>
      </div>
    </>
  );
}
