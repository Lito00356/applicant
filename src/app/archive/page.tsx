import { Suspense } from "react";
import ArchiveListLoader from "@/src/app/components/company/ArchiveListLoader";
import HamburgerMenu from "@/src/app/components/menu/HamburgerMenu";

export default function ArchivePage() {
  return (
    <main className="flex min-h-screen flex-col bg-canvas px-4 py-6 text-slate-950 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        <header className="mb-6 flex items-center justify-between gap-4 text-slate-950">
          <h1 className="text-2xl font-semibold tracking-tight">Archive</h1>
          <HamburgerMenu />
        </header>

        <Suspense fallback={<div className="flex-1 animate-pulse rounded-xl bg-surface/80" />}>
          <ArchiveListLoader />
        </Suspense>
      </div>
    </main>
  );
}
