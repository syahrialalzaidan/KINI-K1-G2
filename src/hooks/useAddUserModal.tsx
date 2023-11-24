import { create } from "zustand";

interface AddUserModalData {
  section: string;
  description: string;
}

interface AddUserModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddUserModal = create<AddUserModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddUserModal;
