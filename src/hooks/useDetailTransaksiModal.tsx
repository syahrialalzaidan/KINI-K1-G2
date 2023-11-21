import { TransactionItem } from "@prisma/client";
import { create } from "zustand";

interface DetailTransaksiModalData {
  data? : TransactionItem[]
}

interface DetailTransaksiModalStore {
  isOpen: boolean;
  data: TransactionItem[];
  onOpen: (data?: TransactionItem[]) => void;
  onClose: () => void;
}

const useDetailTransaksiModal = create<DetailTransaksiModalStore>((set) => ({
  isOpen: false,
  data: [],
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default useDetailTransaksiModal;
