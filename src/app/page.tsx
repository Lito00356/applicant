import CompanyListLoader from "@/src/app/components/company/CompanyListLoader";
import ElapsedTimer from "@/src/app/components/timer/ElapsedTimer";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-canvas px-4 py-6 text-slate-950 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        <header className="mb-6 flex items-baseline justify-between gap-4 text-slate-950">
          <h1 className="text-2xl font-semibold tracking-tight">Jobhunt</h1>
          <div className="flex items-baseline gap-1 text-sm text-slate-500">
            <span className="font-semibold text-slate-700">TWJ</span>
            <ElapsedTimer />
          </div>
        </header>

        <Suspense fallback={<div className="flex-1 animate-pulse rounded-xl bg-surface/80" />}>
          <CompanyListLoader />
        </Suspense>
      </div>
    </main>
  );
}
