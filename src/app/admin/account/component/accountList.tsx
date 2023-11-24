'use client'
import Image from "next/image";

import useEditProfilModal from "@/hooks/useEditProfilModal";
import EditProfilModal from "@/components/modal/EditProfilModal";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import AddAccount from "./addAccount";

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

export default function AccountList({ users }: AccountListProps) {
    const editModal = useEditProfilModal()
    const [search, setSearch] = useState<string>('');
    const [searchedUsers, setSearchedUsers] = useState<User[]>(users)

    const findUsers = () => {
        const filteredUsers = users.filter(user =>
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchedUsers(filteredUsers);

    }

    useEffect(() => {
        findUsers()
    }, [search, users])

    return (
        <div className="flex flex-col">
            <div className="w-full flex gap-4">
                <div className="flex justify-between items-center shadow-sm mr-5 py-2 px-2 w-[85%] rounded-md bg-white">
                    <input
                        className="focus:border-none w-[90%] focus:ring-0 focus:outline-none placeholder:text-ungu"
                        placeholder="Cari user...."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    >
                    </input>
                    <AiOutlineSearch className="text-ungu text-2xl relative cursor-pointer" />
                </div>
                <AddAccount />
            </div>
            <table className="table-fixed my-7 rounded-md overflow-hidden w-full">
                <thead className="bg-ungu-mid text-ungu text-left font-extralight">
                    <tr>
                        <th className="px-4 py-3 w-[5%]" ></th>
                        <th className="px-4 py-3">Username</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Created at</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {searchedUsers?.map((user) => {
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
        </div>
    )
}