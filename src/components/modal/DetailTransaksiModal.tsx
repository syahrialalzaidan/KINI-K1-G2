"use client";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "./Modal";
import useDetailTransaksiModal from "@/hooks/useDetailTransaksiModal";

const DetailTransaksiModal = () => {
  const addDetailTransaksiModal = useDetailTransaksiModal();

  const bodyElement = (
    <div className="p-24">
      <div
        className="absolute top-6 right-8"
        onClick={() => {
          addDetailTransaksiModal.onClose();
        }}
      >
        <AiOutlineClose className="text-2xl cursor-pointer" />
      </div>

      <table className="w-full rounded-lg">
        <tr>
          <th className="font-bold border-b py-4 text-left border-gray-500 w-2/5">
            Nama
          </th>
          <th className="font-bold border-b py-4 text-left border-gray-500 w-[30%]">
            Kuantitas
          </th>
          <th className="font-bold border-b py-4 text-left border-gray-500 w-[30%]">
            Harga
          </th>
        </tr>

        <tbody>
          {addDetailTransaksiModal.data.map((item, index) => (
            <tr key={index} className="border-b border-gray-500">
              <td className="py-1">{item.name}</td>
              <td className="py-1">{item.qty}</td>
              <td className="py-1">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <Modal
      isOpen={addDetailTransaksiModal.isOpen}
      body={bodyElement}
      actionLabel="Buat Transaksi Baru"
      onClose={addDetailTransaksiModal.onClose}
    />
  );
};

export default DetailTransaksiModal;
