"use client";

import { useEffect, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import usePaymentModal from "@/hooks/usePaymentModal";

const PaymentModal = () => {
  const addpaymentmodal = usePaymentModal();

  const bodyElement = (
    <div className="w-full justify-center items-center flex flex-col gap-8">
      <h1 className={`font-bold text-5xl text-center text-secondary1`}>
        Pembayaran Terkonfirmasi
      </h1>
      <p>Pastikan bukti transaksi telah diberikan ke pelanggan.</p>
    </div>
  );
  return (
    <Modal
      isOpen={addpaymentmodal.isOpen}
      body={bodyElement}
      actionLabel="Buat Transaksi Baru"
      onClose={addpaymentmodal.onClose}
    />
  );
};

export default PaymentModal;
