"use client";

import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import useProductDetailsModal from "@/hooks/useProductDetailsModal";
import Modal from "./Modal";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function ProductDetailsModal() {
  const productDetailsModal = useProductDetailsModal();
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async (id: string) => {
    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/product/${id}`, {
        method: "DELETE",
      });
      router.refresh();
      toast.success("Produk berhasil dihapus!");
      productDetailsModal.onClose();
    } catch (error: any) {
      toast.error(error.message);
      return NextResponse.json(error);
    }
  };

  const bodyElement = (
    <div className="bg-secondary0_5 border border-black rounded-md relative p-3 lg:mx-48 lg:my-20 md:mx-24 md:my-10 text-left shadow-xl transistion-all flex flex-col gap-5">
      <button
        type="button"
        className="absolute top-4 right-4 z-10 w-max hover:bg-slate-300 rounded-full"
        onClick={productDetailsModal.onClose}
      >
        <IoMdClose size={23} onClick={productDetailsModal.onClose} />
      </button>
      <div className="relative">
        <img
          src={productDetailsModal.data.image}
          alt="Image product"
          className="bg-white object-contain w-full h-40 border border-black rounded-lg bg-center bg-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-start justify-between">
          <h2 className="font-medium text-xs mt-1 opacity-50">
            {productDetailsModal.data.jenisBrg}
          </h2>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                handleDelete(productDetailsModal.data.id);
              }}
            >
              <MdDelete color="red" size={24} />
            </button>
            <button
              type="button"
              onClick={() =>
                session?.user.role == "ADMIN"
                  ? router.push("/admin/catalogue/editItems")
                  : router.push("/warehouse/editItems")
              }
            >
              <AiFillEdit size={24} />
            </button>
          </div>
        </div>
        <div className="font-bold text-xl">
          {productDetailsModal.data.namaBrg}
        </div>
        <div className="mt-3 flex flex-wrap gap-4">
          <div className="flex justify-between gap-5 w-full text-right text-xs">
            <p className="font-bold">Harga Barang</p>
            <p className="font-semibold">{productDetailsModal.data.hargaBrg}</p>
          </div>
          <div className="flex justify-between gap-5 w-full text-right text-xs">
            <p className="font-bold">Stok</p>
            <p className="font-semibold">{productDetailsModal.data.stok}</p>
          </div>
          <div className="flex justify-between gap-5 w-full text-right text-xs">
            <p className="font-bold">Penerima</p>
            <p className="font-semibold">{productDetailsModal.data.penerima}</p>
          </div>
          <div className="flex justify-between gap-5 w-full text-right text-xs">
            <p className="font-bold">Tanggal Update</p>
            <p className="font-semibold">
              {productDetailsModal.data.tglUpdate.substring(0, 10)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={productDetailsModal.isOpen}
      body={bodyElement}
      actionLabel="close"
      onClose={productDetailsModal.onClose}
    />
  );
}
