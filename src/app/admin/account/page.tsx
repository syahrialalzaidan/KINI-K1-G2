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
                    <AddAccount />
                </div>
                <AccountList users={users}/>
            </div>
        </div>
        </>
    )
}