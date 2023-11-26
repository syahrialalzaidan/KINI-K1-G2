'use client'
import useAddUserModal from "@/hooks/useAddUserModal";

export default function AddAccount() {
    const addModal = useAddUserModal()
    return (
        <button 
            className="bg-ungu text-xs text-white px-5 rounded-md h-10"
            onClick={() => addModal.onOpen()}
        >
            Tambah User
        </button>
    )
}