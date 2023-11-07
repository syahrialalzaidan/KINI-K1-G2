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
    <div className="w-full justify-center items-center flex gap-4">
      <h1
        className={`font-bold text-5xl text-center ${
          props.role == "warehouse" ? "text-secondary-warehouse" : "text-ungu"
        }`}
      >
        {props.text}
      </h1>
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
