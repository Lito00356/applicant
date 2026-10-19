"use client";

import { useState } from "react";
import CompanyForm from "@/src/app/components/companiesCRUD/CompanyForm";
import Modal from "@/src/app/components/ui/Modal";

const AddCompanyButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm"
      >
        + Add company
      </button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Add company">
        {/* Alleen renderen als de modal open is: zo begint het formulier telkens leeg. */}
        {isOpen && <CompanyForm onSuccess={() => setIsOpen(false)} onCancel={() => setIsOpen(false)} />}
      </Modal>
    </>
  );
};

export default AddCompanyButton;
