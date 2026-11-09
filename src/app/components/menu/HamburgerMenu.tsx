"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { logout } from "@/src/app/lib/actions/auth";

const itemClass = "block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isArchive = usePathname() === "/archive";

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
        aria-expanded={isOpen}
        className="flex size-9 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-300/60"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5">
          <path d="M3 5h14M3 10h14M3 15h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-10 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
          {/* Op het archief verwijst de link terug naar het overzicht, anders naar het archief */}
          <Link href={isArchive ? "/" : "/archive"} onClick={() => setIsOpen(false)} className={itemClass}>
            {isArchive ? "Overview" : "Archive"}
          </Link>
          <form action={logout}>
            <button type="submit" className={`${itemClass} text-red-600 hover:bg-red-50`}>
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
