"use client";

import { FilterButtonProps } from "@/src/app/lib/types";

// Een tab zoals op een map: de actieve tab is hoger en breder en "plakt" aan de kaart.
const FilterButton = ({ label, color, isActive, onClick }: FilterButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`${color} whitespace-nowrap rounded-t-lg text-sm text-slate-950 transition-opacity ${
        isActive
          ? "min-w-26 px-5 pb-3 pt-2.5 font-medium md:min-w-32 md:px-7"
          : "min-w-22 px-4 pb-1.5 pt-1 opacity-90 hover:opacity-100 md:min-w-28 md:px-6"
      }`}
    >
      {label}
    </button>
  );
};

export default FilterButton;
