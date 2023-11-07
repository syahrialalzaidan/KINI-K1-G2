import { create } from "zustand";

interface AddedProductModalData {
  section: string;
  description: string;
}

interface AddedProductModalStore {
  isOpen: boolean;
  data: AddedProductModalData;
  onOpen: (data?: AddedProductModalData) => void;
  onClose: () => void;
}

const useAddedProductModal = create<AddedProductModalStore>((set) => ({
  isOpen: false,
  data: {
    section: "",
    description: "",
  },
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddedProductModal;
