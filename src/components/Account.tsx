import { IoMdNotificationsOutline } from "react-icons/io";

interface AccountProps {
  nama: string | undefined;
  role: string;
}

export default function Account(props: AccountProps) {
  function getBgColor() {
    if (props.role == "warehouse") {
      return "bg-[#F472B6]";
    } else if (props.role == "admin") {
      return "bg-ungu";
    } else {
      return "bg-[#6DADA9]";
    }
  }

  return (
    <div className="flex items-center gap-4 justify-end px-12">
      <IoMdNotificationsOutline className="text-4xl text-gray-600" />
      <div className={`${getBgColor()} w-48 flex gap-4 rounded-lg p-4`}>
        <div className="w-10 h-10 rounded-full bg-gray-300 border-[#F472B6]/30"></div>

        <div>
          <p className="text-white">
            Hi, <span className="font-bold">{props.nama}!</span>
          </p>
          <p className="text-white">{props.role}</p>
        </div>
      </div>
    </div>
  );
}
