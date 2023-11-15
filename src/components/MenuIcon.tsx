"use client";

import { useState } from "react";

interface MenuIconProps {
  isOpen: boolean;
  handleToggle: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({ isOpen, handleToggle }) => {
  return (
    <div
      className="w-5 aspect-[1/0.75] relative sm:hidden z-50"
      onClick={handleToggle}
    >
      <div
        className={`h-[0.2rem] w-full bg-ungu rounded-lg absolute -translate-y-1/2 ${
          isOpen ? "rotate-45 top-1/2" : "rotate-0 top-0"
        } transition-all duration-300 ease-in-out`}
      ></div>
      <div
        className={`h-[0.2rem] w-full bg-ungu rounded-lg absolute top-1/2 -translate-y-full ${
          isOpen ? "scale-x-0" : "scale-x-100"
        } transition-all duration-300 ease-in-out`}
      ></div>
      <div
        className={`h-[0.2rem] w-full bg-ungu rounded-lg absolute -translate-y-1/2 ${
          isOpen ? "-rotate-45 top-2/4" : "rotate-0 bottom-0"
        } transition-all duration-300 ease-in-out`}
      ></div>
    </div>
  );
};

export default MenuIcon;
