import AddUserModal from "@/components/modal/AddUserModal";

import AccountList from "./component/accountList";

async function getUsers() {
    try {
        const res = await fetch(
            process.env.NEXT_PUBLIC_API_URL + `/api/account`,
            {
              cache: "no-store",
            }
          );
        return res.json()
    } catch (error: any) {
        console.log(error)
    }
}

export default async function AdminPage() {
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
            </div>
        </div>
        </>
    )
}