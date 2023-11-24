

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
      <button className="bg-[#FFD4E6] h-10 w-28 rounded-lg pl-2 flex items-center justify-around">
        {getLogo()}
        {props.title}
        <RiArrowDropDownLine size={30} />
      </button>
    </div>
  )
}
