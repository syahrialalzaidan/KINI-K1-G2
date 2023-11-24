import Sidebar from "@/components/Sidebar";
import Image from "next/image";

import AddUserModal from "@/components/modal/AddUserModal";

import AccountList from "./component/accountList";
import AddAccount from "./component/addAccount";

import axios from "axios";

async function getUsers() {
    try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/account`)
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
                <AccountList users={users}/>
            </div>
        </div>
        </>
    )
}