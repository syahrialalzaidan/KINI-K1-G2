import { create } from "zustand";

interface AddUserModalData {
  section: string;
  description: string;
}

interface AddUserModalStore {
  isOpen: boolean;
  data: AddUserModalData;
  onOpen: (data?: AddUserModalData) => void;
  onClose: () => void;
}

const useAddUserModal = create<AddUserModalStore>((set) => ({
  isOpen: false,
  data: {
    section: "",
    description: "",
  },
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddUserModal;
