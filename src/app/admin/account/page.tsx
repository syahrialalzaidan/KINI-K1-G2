import Sidebar from "@/components/Sidebar";
import Image from "next/image";

import AddUserModal from "@/components/modal/AddUserModal";

import AccountList from "./component/accountList";
import AddAccount from "./component/addAccount";

import axios from "axios";

async function getUsers() {
    try {
        const res = await axios.get('http://localhost:3000/api/account')
        return res.data
    } catch (error: any) {
        console.log(error)
    }
}

export default async function ManageAccount() {
    const users = await getUsers();
    
    return (
        <>
        <AddUserModal />
        <div className="bg-[#FBF4FB] min-h-screen flex flex-col items-start">
            <div className="mx-40">
                <div className="my-7">
                    <p className="font-bold text-5xl">
                        Manage Account
                    </p>
                </div>
                <div className="flex flex-row my-7">
                    <AccountList users={users}/>
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