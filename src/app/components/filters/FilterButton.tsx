"use client";

import { FilterButtonProps } from "@/src/app/lib/types";

// Een tab zoals op een map: de actieve tab is hoger en breder en "plakt" aan de kaart.
const FilterButton = ({ label, color, isActive, onClick }: FilterButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`${color} rounded-t-lg text-sm text-slate-950 transition-opacity ${
        isActive ? "min-w-32 px-7 pb-3 pt-2.5 font-medium" : "min-w-28 px-6 pb-1.5 pt-1 opacity-90 hover:opacity-100"
      }`}
    >
      {label}
    </button>
  );
};

export default FilterButton;
