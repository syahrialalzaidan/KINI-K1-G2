import { create } from "zustand";
import { ProdukProps } from "@/types";

interface ProductDetailsModalStore {
  isOpen: boolean;
  data: ProdukProps;
  onOpen: (data?: ProdukProps) => void;
  onClose: () => void;
}

const useProductDetailsModal = create<ProductDetailsModalStore>((set) => ({
  isOpen: false,
  data: {
    id: "",
    jenisBrg: "" ,
    namaBrg: "",
    hargaBrg: 0,
    stok: 0,
    penerima: "",
    image: "",
    tglUpdate: ""
  },
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default useProductDetailsModal;
