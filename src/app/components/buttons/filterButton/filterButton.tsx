"use client";

import { FilterButtonProps } from "@/src/app/lib/types";

const FilterButton = ({ filter, isActive, index }: FilterButtonProps) => {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      onClick={() => console.log(index)}
      className={
        isActive
          ? "rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm"
          : "rounded-full px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-white hover:text-slate-950"
      }
    >
      {filter}
    </button>
  );
};

export default FilterButton;
