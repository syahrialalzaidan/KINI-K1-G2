"use client";

import { useEffect, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import useEditProfilModal from "@/hooks/useEditProfilModal";
import { AiOutlineClose } from "react-icons/ai";

const EditProfilModal = () => {
  const editprofilmodal = useEditProfilModal();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const bodyElement = (
    <div className="p-8">
      <div className="flex justify-end">
        <AiOutlineClose
          onClick={editprofilmodal.onClose}
          className="text-2xl cursor-pointer hover:scale-110"
        />
      </div>

      <h1 className="text-4xl font-bold text-center">Edit Profil</h1>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex gap-7 items-center">
          <label className="block text-2xl font-semibold w-44 text-[#545F71]">
            Username
          </label>

          <input
            type="text"
            className="w-full border-2 border-black rounded-lg p-2 mt-2"
            placeholder="rerebredel"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex gap-7 items-center">
          <label className="block text-2xl font-semibold text-[#545F71] w-44">
            Name
          </label>

          <input
            type="text"
            className="w-full border-2 border-black rounded-lg p-2 mt-2"
            placeholder="Adrenalin Apprizal"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex gap-7 items-center">
          <label className="block text-2xl font-semibold text-[#545F71] w-32">
            Role
          </label>

          <select
            className="border-2 border-black rounded-lg p-2"
            placeholder="Admin"
            onChange={(e) => setRole(e.target.value)}
          >
            <option className="">Admin</option>
            <option className="">Cashier</option>
            <option className="">Warehouse</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="bg-[#FF4747] text-white py-3 px-4 rounded-md hover:scale-110"
          onClick={() => {}}
        >
          Hapus Akun
        </button>

        <button
          className="bg-ungu text-white py-3 px-4 rounded-md hover:scale-110"
          onClick={() => {}}
        >
          Simpan
        </button>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={editprofilmodal.isOpen}
      body={bodyElement}
      actionLabel="Buat Transaksi Baru"
      onClose={editprofilmodal.onClose}
    />
  );
};

export default EditProfilModal;
