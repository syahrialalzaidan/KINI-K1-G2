import { create } from "zustand";

interface EditProfilModalData {
  id: string;
  username: string;
  name: string;
  password: string;
  role: string;
  createdAt: string;
}

interface EditProfilModalStore {
  isOpen: boolean;
  data: EditProfilModalData;
  onOpen: (data?: EditProfilModalData) => void;
  onClose: () => void;
}

const useEditProfilModal = create<EditProfilModalStore>((set) => ({
  isOpen: false,
  data: {
    id: "",
    username: "",
    name: "",
    password: "",
    role: "",
    createdAt:""
  },
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditProfilModal;
