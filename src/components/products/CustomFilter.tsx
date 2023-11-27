

import { FaSort } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";

interface filterProps {
  title: string
}

export default function CustomFilter(props: filterProps) {
  function getLogo() {
    if (props.title === "Filter") {
      return <FaFilter />;
    } else if (props.title === "Sort") {
      return <FaSort size={18} />;
    }
  }

  return (
    <div>
      <button className="xl:border bg-white border-slate-300 text-black opacity-80 xl:opacity-30 h-10 w-28 rounded-lg pl-2 flex items-center justify-around">
        {getLogo()}
        {props.title}
        <RiArrowDropDownLine size={30} />
      </button>
    </div>
  )
}
