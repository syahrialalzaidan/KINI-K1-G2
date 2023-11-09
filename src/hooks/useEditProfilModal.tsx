import { create } from "zustand";

interface EditProfilModalData {
  section: string;
  description: string;
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
    section: "",
    description: "",
  },
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditProfilModal;
