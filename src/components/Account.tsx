interface AccountProps {
  nama: string | undefined;
  role: string;
}

export default function Account(props: AccountProps) {
  function getBgColor() {
    if (props.role.toLowerCase() == "warehouse") {
      return "bg-pink-500";
    } else if (props.role.toLowerCase() == "admin") {
      return "bg-ungu";
    } else {
      return "bg-[#6DADA9]";
    }
  }

  return (
    <div className="flex items-center gap-4 justify-end">
      <div className={`${getBgColor()} w-44 flex gap-4 rounded-lg p-4`}>
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
