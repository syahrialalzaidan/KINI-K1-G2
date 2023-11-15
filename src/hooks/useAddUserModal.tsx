import { create } from "zustand";

interface AddUserModalData {
  username: string;
  name: string;
  password: string;
  role: string;
}

interface AddUserModalStore {
  isOpen: boolean;
  data: AddUserModalData;
  onOpen: () => void;
  onClose: () => void;
}

const useAddUserModal = create<AddUserModalStore>((set) => ({
  isOpen: false,
  data: {
    username: "",
    name: "",
    password: "",
    role: "",
  },
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddUserModal;
