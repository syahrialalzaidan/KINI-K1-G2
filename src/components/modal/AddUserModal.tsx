"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import useAddUserModal from "@/hooks/useAddUserModal";
import { NextResponse } from "next/server";
import { toast } from "react-hot-toast";

const AddUserModal = () => {
  const router = useRouter();
  const addusermodal = useAddUserModal();
  const [role, setRole] = useState("ADMIN");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // TODO: Handle Username sama
  const handleSubmit = async () => {
    try {
      if (!username || !name || !password || !role) {
        throw new Error("Data tidak lengkap!")
      }
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          name,
          password,
          role
        })
      })

      if (res.ok) {
        router.refresh()
        toast.success("Akun berhasil dibuat!")
        addusermodal.onClose();
      }

      if (res.status === 406) {
        throw new Error("Username sudah ada!")
      }
      
    } catch (error: any) {
      toast.error(error.message)
      return NextResponse.json(error)
    }
  }

  const bodyElement = (
    <div className="p-8">
      <div className="flex justify-end">
        <AiOutlineClose
          onClick={addusermodal.onClose}
          className="text-2xl cursor-pointer hover:scale-110"
        />
      </div>

      <h1 className="text-4xl font-bold text-center">Tambah User</h1>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex gap-7 items-center">
          <label className="block text-2xl font-semibold text-[#545F71]">
            New Username
          </label>

          <input
            type="text"
            className="w-full border-2 border-black rounded-lg p-2 mt-2"
            placeholder="Enter new username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex gap-7 items-center">
          <label className="block text-2xl font-semibold text-[#545F71] w-44">
            New Name
          </label>

          <input
            type="text"
            className="w-full border-2 border-black rounded-lg p-2 mt-2"
            placeholder="Enter new name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex gap-7 items-center">
          <label className="block text-2xl font-semibold text-[#545F71] w-44">
            Password
          </label>

          <input
            type="password"
            className="w-full border-2 border-black rounded-lg p-2 mt-2"
            placeholder="Enter  new password"
            onChange={(e) => setPassword(e.target.value)}
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
            defaultValue={"ADMIN"}
          >
            <option value="ADMIN">Admin</option>
            <option value="CASHIER">Cashier</option>
            <option value="WAREHOUSE">Warehouse</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          className="bg-ungu text-white py-3 px-4 rounded-md hover:scale-110"
          onClick={() => handleSubmit()}
        >
          Konfirmasi
        </button>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={addusermodal.isOpen}
      body={bodyElement}
      actionLabel="Buat Transaksi Baru"
      onClose={addusermodal.onClose}
    />
  );
};

export default AddUserModal;
