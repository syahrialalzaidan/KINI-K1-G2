'use client'
import useAddUserModal from "@/hooks/useAddUserModal";
import AddUserModal from "@/components/modal/AddUserModal";

export default function AddAccount() {
    const addModal = useAddUserModal()
    return (
        <button 
            className="bg-ungu text-xs text-white px-5 rounded-md"
            onClick={() => addModal.onOpen()}
        >
            Tambah User
        </button>
    )
}