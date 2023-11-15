'use client'
import Image from "next/image";

import useEditProfilModal from "@/hooks/useEditProfilModal";
import EditProfilModal from "@/components/modal/EditProfilModal";

interface User {
    id: string;
    username: string;
    name: string;
    role: string;
    createdAt: string;
  }
  
  interface AccountListProps {
    users: User[];
  }

export default function AccountList({users}: AccountListProps) {
    const editModal = useEditProfilModal()
    return (
        <>
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
                                <EditProfilModal />
                                <Image 
                                    src="/edit.svg"
                                    alt="Edit Profile"
                                    className="mx-auto"
                                    width={20}
                                    height={20}
                                    onClick={() => editModal.onOpen({
                                        id: user.id,
                                        username: user.username,
                                        name: user.name,
                                        password: "******",
                                        role: user.role,
                                        createdAt: user.createdAt
                                    })}
                                />
                            </td>
                            <td className="px-4 py-3">{user.username}</td>
                            <td className="px-4 py-3">{user.name}</td>
                            <td className="px-4 py-3">{user.role}</td>
                            <td className="px-4 py-3">{user.createdAt.substring(0, 10)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}