"use client";

import { useState, type FormEvent } from "react";
import Modal from "@/src/app/components/ui/Modal";
import { RejectionReasonModalProps } from "@/src/app/lib/types";

const RejectionReasonModal = ({ open, companyName, defaultReason, onConfirm, onCancel }: RejectionReasonModalProps) => {
  const [reason, setReason] = useState(defaultReason ?? "");
  const trimmedReason = reason.trim();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!trimmedReason) return;
    onConfirm(trimmedReason);
  };

  return (
    <Modal open={open} onClose={onCancel} title={`Why did ${companyName} reject you?`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Reason
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            required
            rows={4}
            autoFocus
            placeholder="E.g. not enough experience, position already filled, ..."
            className="rounded-md border border-slate-300 p-2 text-sm font-normal text-slate-950"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-slate-950"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!trimmedReason}
            className="rounded-full bg-slate-950 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-40"
          >
            Mark as rejected
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RejectionReasonModal;
