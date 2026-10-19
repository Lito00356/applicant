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
        aria-label="Add company"
        title="Add company"
        className="flex size-10 items-center justify-center rounded-full bg-add text-2xl leading-none text-slate-950 shadow-sm transition-transform hover:scale-105"
      >
        +
      </button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Add company">
        {isOpen && <CompanyForm onSuccess={() => setIsOpen(false)} onCancel={() => setIsOpen(false)} />}
      </Modal>
    </>
  );
};

export default AddCompanyButton;
