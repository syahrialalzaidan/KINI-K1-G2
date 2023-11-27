"use client"

import Account from '@/components/Account'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, Fragment } from 'react';
import { IoIosArrowBack } from "react-icons/io";

import { items } from '@/types';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import toast from 'react-hot-toast';
import { NextResponse } from 'next/server';
import { UploadButton } from '@/app/utils/uploadthing';
import { Pencil } from 'lucide-react';
import { UploadDropzone } from '@uploadthing/react';

export default function AddBarang() {
  const router = useRouter()

  const [jenisBrg, setJenisBrg] = useState(items[0])
  const [namaBrg, setNamaBrg] = useState("")
  const [stok, setStok] = useState("")
  const [harga, setHarga] = useState("")
  const [tanggal, setTanggal] = useState("")
  const [penerima, setPenerima] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = async() => {
    try {
      console.log(jenisBrg, namaBrg, stok, harga, tanggal, penerima, image)
      if (!namaBrg || !stok || !harga || !tanggal || !penerima || !image) {
        toast.error("Isi data dengan lengkap!")
      }
      const res = await fetch("http://localhost:3000/api/product", {
        method:"POST",
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
          jenisBrg,
          namaBrg,
          stok,
          harga,
          tanggal,
          penerima,
          image
        })
      })

      console.log("tes 1")
      if (res.ok) {
        router.refresh()
        toast.success("Produk berhasil dibuat!")
        router.push("/")
      }
      console.log("tes 2")
      if (res.status === 406) {
        throw new Error("Nama produk sudah ada!")
      }

    } catch (error: any) {
      console.log("error ya")
      toast.error(error.message)
      return NextResponse.json(error)
    }
  }

  return (
    <div className="font-noto max-w-md flex flex-col pb-14 mx-auto sm:max-w-screen-lg sm:ml-96 pt-4">
      <div className="flex justify-between items-start">
        <div className='flex gap-4 mt-6 sm:-ml-10'>
          <button className='' onClick={() => router.push("/warehouse")}>
            <IoIosArrowBack color="#DB2777" size={26} />
          </button>
          <p className='text-lg font-semibold text-[#DB2777]'>Catalog</p>
        </div>
        <Account 
            nama="Iyal"
            role="warehouse"
        />
      </div>
      
      <div className="mt-12">
          <h1 className="text-4xl font-bold">Add Product</h1>
          <h2 className='mt-4 -mb-4 text-md text-slate-500'>Catalog/Add Product</h2>
      </div>

      <div className='bg-white w-full shadow-md mt-16 h-max rounded-xl'>
        <div className="p-7 text-left transistion-all flex flex-col gap-5">
          <div className='flex flex-col gap-5 lg:flex-row sm:justify-between'>
            <div className='relative'>
              <label className='font-light opacity-30 text-sm ml-1'>
                Jenis Barang
              </label>
              <div className="w-full rounded-lg mt-2 sm:w-72">
                <Listbox value={jenisBrg} onChange={setJenisBrg}>
                  <div className="relative mt-1">
                    <Listbox.Button className="border border-slate-300 relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{jenisBrg.cat}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {items.map((item, itemIdx) => (
                          <Listbox.Option
                            key={itemIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                              }`
                            }
                            value={item}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {item.cat}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
            <div>
              <label className='font-light opacity-30 text-sm ml-1'>
                  Nama Barang
              </label>
              <input 
                type="text"
                className='w-full border border-slate-300 rounded-lg p-2 mt-2 lg:mr-10'
                placeholder='Masukkan nama barang'
                onChange={(e) => setNamaBrg(e.target.value)}
              />
            </div>
            <div>
              <label className='font-light opacity-30 text-sm ml-1'>
                  Stok Barang
              </label>
              <input 
                type="text"
                className='w-full border border-slate-300 rounded-lg p-2 mt-2 lg:mr-10'
                placeholder='Masukkan jumlah barang'
                onChange={(e) => setStok(e.target.value)}
              />
            </div>
          </div>

          <div className='flex flex-col gap-5 lg:flex-row sm:justify-between'>
            <div>
              <label className='font-light opacity-30 text-sm ml-1'>
                  Harga Barang
              </label>
              <input 
                type="text"
                className='w-full border border-slate-300 rounded-lg p-2 mt-2 lg:mr-44'
                placeholder='Masukkan harga barang'
                onChange={(e) => setHarga(e.target.value)}
              />
            </div>
            <div>
              <label className='font-light opacity-30 text-sm ml-1'>
                  Tanggal Penerimaan
              </label>
              <input 
                type="datetime-local"
                className='w-full border border-slate-300 rounded-lg p-2 mt-2 lg:mr-44'
                id='addItems'
                name='addItems'
                min="2023-01-01T00:00"
                max="2028-12-31T23:59"
                onChange={(e) => setTanggal(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className='font-light opacity-30 text-sm ml-1'>
                Diterima Oleh
            </label>
            <input 
              type="text"
              className='w-full border border-slate-300 rounded-lg p-2 mt-2'
              placeholder='Masukkan nama penerima'
              onChange={(e) => setPenerima(e.target.value)}
            />
          </div>

          <div className='relative'>
            <div>
              <label className='font-light opacity-30 text-sm ml-1'>
                  Foto Barang
              </label>
              <div className='w-full h-80 border border-slate-300 rounded-lg p-2 mt-2'>
                {image ? (
                <Image
                  src={image}
                  alt="Product image"
                  width={1000}
                  height={667}
                  className="w-full h-64 object-contain"
                />
              ) : (
                <UploadButton
                  endpoint="productImage"
                  onClientUploadComplete={(res) => {
                    setImage(res[0].url);
                    // Do something with the response
                    console.log("Files: ", res);
                    toast.success("Upload Completed");
                  }}
                  onUploadError={(error) => {
                    // Do something with the error.
                    console.log(`ERROR! ${error.message}`);
                    toast.error("Cannot upload the image!")
                  }}
                  className='mt-28 ml-72 lg:ml-40 sm:ml-80'
                />
              )}
              </div> 
              {image && (
                <button
                  onClick={() => setImage("")}
                  type="button"
                  className="mt-5 text-sm flex space-x-2 bg-black opacity-30 hover:bg-slate-400 rounded-md shadow text-slate-50 py-2 px-4"
                >
                  <Pencil className="w-5 h-5" />
                  <span>Change Image</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white w-full shadow-md mt-8 h-max rounded-xl'>
        <div className='p-5 text-left transistion-all flex gap-5 font-light'>
          <button onClick={() => handleSubmit()} className='bg-pink-500 hover:bg-pink-600 py-1.5 px-8 rounded-lg text-white'>
            SAVE
          </button>
          <button onClick={() => router.push("/warehouse")} className='border hover:bg-slate-200 py-1.5 px-6 rounded-lg text-gray-400'>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  )
}
