import { create } from "zustand";

interface AddPaymentModalData {
  section: string;
  description: string;
}

interface AddPaymentModalStore {
  isOpen: boolean;
  data: AddPaymentModalData;
  onOpen: (data?: AddPaymentModalData) => void;
  onClose: () => void;
}

const usePaymentModal = create<AddPaymentModalStore>((set) => ({
  isOpen: false,
  data: {
    section: "",
    description: "",
  },
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default usePaymentModal;
