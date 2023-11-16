"use client";

import { useEffect, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import useAddedProductModal from "@/hooks/useAddedProductModal";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

interface AddProductModalProps {
  role: string;
  text: string;
}

const ProductModal = (props: AddProductModalProps) => {
  const router = useRouter();
  const addProductModal = useAddedProductModal();

  const bodyElement = (
    <div className="p-24">
      <div className="w-full justify-center items-center flex gap-4">
        <h1
          className={`font-bold text-5xl text-center ${
            props.role == "warehouse" ? "text-secondary-warehouse" : "text-ungu"
          }`}
        >
          {props.text}
        </h1>
      </div>
      <div className="flex mt-4 justify-center">
        <button
          className={`bg-secondary-warehouse
          } rounded-lg text-white px-6 py-4 flex flex-row items-center justify-center`}
          onClick={addProductModal.onClose}
        >
          Kembali
        </button>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={addProductModal.isOpen}
      role={props.role}
      body={bodyElement}
      actionLabel="Kembali"
      onClose={addProductModal.onClose}
    />
  );
};

export default ProductModal;
