"use client";

import { useEffect, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import useEditProfilModal from "@/hooks/useEditProfilModal";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { NextResponse } from "next/server";

const EditProfilModal = () => {
  const router = useRouter();
  const editprofilmodal = useEditProfilModal();

  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleDelete = async (id: string) => {
    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/account/${id}`, {
        method: "DELETE",
      });

      router.refresh();
      toast.success("Akun berhasil dihapus!");
      editprofilmodal.onClose();
    } catch (error: any) {
      toast.error(error.message);
      return NextResponse.json(error);
    }
  };

  // TODO: Handle Username sama
  const handleUpdate = async (id: string) => {
    try {
      if (username === "" || name === "" || role === "") {
        throw new Error("Field tidak boleh kosong!");
      }

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/account/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            name,
            role,
          }),
        }
      );

      if (res.ok) {
        router.refresh();
        toast.success("Akun berhasil diperbarui!");
        editprofilmodal.onClose();
      }

      if (res.status === 406) {
        throw new Error("Username sudah ada!");
      }
    } catch (error: any) {
      toast.error(error.message);
      return NextResponse.json(error);
    }
  };

  useEffect(() => {
    setUsername(editprofilmodal.data.username);
    setName(editprofilmodal.data.name);
    setRole(editprofilmodal.data.role);
  }, [editprofilmodal]);

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
            name="username"
            type="text"
            className="w-full border-2 border-black rounded-lg p-2 mt-2"
            defaultValue={editprofilmodal.data.username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex gap-7 items-center">
          <label className="block text-2xl font-semibold text-[#545F71] w-44">
            Name
          </label>

          <input
            name="name"
            type="text"
            className="w-full border-2 border-black rounded-lg p-2 mt-2"
            defaultValue={editprofilmodal.data.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex gap-7 items-center">
          <label className="block text-2xl font-semibold text-[#545F71] w-32">
            Role
          </label>

          <select
            className="border-2 border-black rounded-lg p-2"
            onChange={(e) => setRole(e.target.value)}
            defaultValue={role}
            value={role}
          >
            <option value="ADMIN">Admin</option>
            <option value="CASHIER">Cashier</option>
            <option value="WAREHOUSE">Warehouse</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="bg-[#FF4747] text-white py-3 px-4 rounded-md hover:scale-110"
          onClick={() => {
            handleDelete(editprofilmodal.data.id);
          }}
        >
          Hapus Akun
        </button>

        <button
          className="bg-ungu text-white py-3 px-4 rounded-md hover:scale-110"
          onClick={() => {
            handleUpdate(editprofilmodal.data.id);
          }}
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
