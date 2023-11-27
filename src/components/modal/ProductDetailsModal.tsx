"use client"

import { useRouter } from 'next/navigation'
import { NextResponse } from 'next/server'
import useProductDetailsModal from '@/hooks/useProductDetailsModal'
import Modal from './Modal'
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { Router } from 'next/router'
import toast from 'react-hot-toast'

export default function ProductDetailsModal() {
  const productDetailsModal = useProductDetailsModal()
  const router = useRouter()

  const handleDelete = async() => {
    try {
      await fetch(`https://localhost:3000/api/product?${productDetailsModal.data.id}`, {
        method:"DELETE"
      })
      console.log("hi")
      router.refresh()
      toast.success("Produk berhasil dihapus!")
      productDetailsModal.onClose();
    } catch (error: any) {
      toast.error(error.message)
      return NextResponse.json(error)
    }
  } 

  const bodyElement = (
    <div className="relative p-3 text-left shadow-xl transistion-all flex flex-col gap-5">
      <button 
        type="button"
        className="absolute top-4 right-4 z-10 w-fit bg-slate-300 hover:bg-pink-500 rounded-full"
        onClick={productDetailsModal.onClose}
      >
          <IoMdClose size={25} onClick={productDetailsModal.onClose} />
      </button>
      <div className="relative">
        <img
          src="indomi.png"
          className="object-contain w-full h-40 bg-pink-400 rounded-lg bg-center bg-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-start justify-between">
          <h2 className="font-semibold text-sm">{productDetailsModal.data.jenisBrg}</h2>
          <div className="flex gap-3">
            <button type="button" onClick={() => {handleDelete()}}>
              <MdDelete color="red" size={24} />
            </button>
            <button type="button">
              <AiFillEdit size={24} />
            </button>
          </div>
        </div>
        <div className="font-bold text-xl">{productDetailsModal.data.namaBrg}</div>
        <div className="mt-3 flex flex-wrap gap-4">
          <div className="flex justify-between gap-5 w-full text-right text-xs">
            <h4 className="text-gray-600 capitalize">Harga Barang</h4>
            <p className="font-semibold">{productDetailsModal.data.hargaBrg}</p>
          </div>
          <div className="flex justify-between gap-5 w-full text-right text-xs">
            <h4 className="text-gray-600 capitalize">Stok</h4>
            <p className="font-semibold">{productDetailsModal.data.stok}</p>
          </div>
          <div className="flex justify-between gap-5 w-full text-right text-xs">
            <h4 className="text-gray-600 capitalize">Penerima</h4>
            <p className="font-semibold">{productDetailsModal.data.penerima}</p>
          </div>
          <div className="flex justify-between gap-5 w-full text-right text-xs">
            <h4 className="text-gray-600 capitalize">Tanggal Update</h4>
            <p className="font-semibold">{productDetailsModal.data.tglUpdate.substring(0, 10)}</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      isOpen={productDetailsModal.isOpen}
      body={bodyElement}
      actionLabel="close"
      onClose={productDetailsModal.onClose}
    />
  )
}
