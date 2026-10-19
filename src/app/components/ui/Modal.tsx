"use client";

import { useEffect, useRef } from "react";
import { ModalProps } from "@/src/app/lib/types";

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="m-auto w-full max-w-2xl rounded-2xl p-0 shadow-xl backdrop:bg-slate-950/50"
    >
      <div className="max-h-[85vh] overflow-y-auto p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full px-2 text-xl leading-none text-slate-400 hover:text-slate-950"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
