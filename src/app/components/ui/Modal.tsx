"use client";

import { useEffect, useRef } from "react";
import { Toaster } from "sonner";
import { MODAL_TOASTER } from "@/src/app/lib/constants";
import { ModalProps } from "@/src/app/lib/types";

const Modal = ({ open, onClose, onEdit, title, children }: ModalProps) => {
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
      className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl p-0 shadow-xl backdrop:bg-slate-950/50"
    >
      <Toaster id={MODAL_TOASTER} position="top-center" richColors />
      <div className="max-h-[85vh] overflow-y-auto overscroll-contain p-5 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="min-w-0 break-words text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
          <div className="flex shrink-0 items-center gap-2">
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                {/* Potloodje */}
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4">
                  <path
                    d="M13 4l3 3-9 9H4v-3l9-9zM11 6l3 3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                Edit
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-full px-2 text-2xl leading-none text-slate-400 hover:text-slate-950"
            >
              ×
            </button>
          </div>
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
