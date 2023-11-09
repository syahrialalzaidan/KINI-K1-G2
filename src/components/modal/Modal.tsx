"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  imageURL?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  role?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  imageURL,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  role,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-[45%] my-6 mx-auto h-auto">
          {/* CONTENT */}
          <div
            className={`translate duration-300 h-full 
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div className="translate h-auto border-0 rounded-lg shadow-lg relative flex flex-col gap-10 w-full bg-white outline-none focus:outline-none">
              {/* BODY */}
              {body && <div className="relative flex-auto">{body}</div>}
              {/* FOOTER */}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
