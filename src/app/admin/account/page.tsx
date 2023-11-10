"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";

import useEditProfilModal from "@/hooks/useEditProfilModal";
import EditProfilModal from "@/components/modal/EditProfilModal";

import useAddUserModal from "@/hooks/useAddUserModal";
import AddUserModal from "@/components/modal/AddUserModal";

export default function ManageAccount() {
    const editModal = useEditProfilModal()
    const addModal = useAddUserModal()
    const users = [
        {
            id: 0,
            username : "rerebredel",
            name : "Adrenalin Apprizal",
            role : "ADMIN",
            createdAt : "24/10/2023"
        },
        {
            id: 1,
            username : "vinnsst",
            name : "Kevin Sebastian",
            role : "CASHIER",
            createdAt : "24/10/2023"
        }
    ]
    return (
        <>
        <EditProfilModal />
        <AddUserModal />
        <div className="bg-[#FBF4FB] min-h-screen flex flex-col items-start">
            <div className="mx-40">
                <div className="my-7">
                    <p className="font-bold text-5xl">
                        Manage Account
                    </p>
                </div>
                <div className="flex flex-row my-7">
                    <div className="flex flex-row shadow-sm mr-5 py-2 px-2 rounded-md bg-white">
                        <input
                            className="focus:border-none focus:ring-0 focus:outline-none placeholder:text-ungu"
                            placeholder="Cari user...."
                        >
                        </input>
                        <Image
                            src="/search.svg"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </div>
                    <button 
                        className="bg-ungu text-xs text-white px-5 rounded-md"
                        onClick={() => addModal.onOpen()}
                    >
                        Tambah User
                    </button>
                </div>
                <table className="table-auto my-7 rounded-md overflow-hidden">
                    <thead className="bg-ungu-mid text-ungu text-left font-extralight">
                        <tr>
                            <th className="px-4 py-3" ></th>
                            <th className="px-4 py-3">Username</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Created at</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {users?.map((user) => {
                            return (
                                <tr key={user.id} className="h-10">
                                    <td className=" ">
                                        <Image 
                                            src="/edit.svg"
                                            alt="Edit Profile"
                                            className="mx-auto"
                                            width={20}
                                            height={20}
                                            onClick={() => editModal.onOpen({
                                                section: user.name,
                                                description: user.role
                                            })}
                                        />
                                    </td>
                                    <td className="px-4 py-3">{user.username}</td>
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.role}</td>
                                    <td className="px-4 py-3">{user.createdAt}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}