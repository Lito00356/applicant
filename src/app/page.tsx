import AddCompanyButton from "@/src/app/components/companiesCRUD/AddCompanyButton";
import CompanyListLoader from "@/src/app/components/company/CompanyListLoader";
import FilterButton from "@/src/app/components/filters/FilterButton";
import ElapsedTimer from "@/src/app/components/timer/ElapsedTimer";
import { Suspense } from "react";

const tableTitles = ["Company", "Role", "Location", "Application status", "URL"];
const filters = ["All", "To contact", "stretch", "Pending", "Rejected"];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Applications</p>
            <h1 className="text-3xl font-semibold tracking-tight">Jobhunt</h1>
          </div>
          <div className="flex items-baseline gap-1 text-slate-400">
            <h2 className="text-lg font-semibold text-slate-700">TWJ</h2>
            <ElapsedTimer />
          </div>
        </header>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Application filters">
            <ul className="flex flex-wrap items-center gap-2">
              {filters.map((filter, index) => {
                const isActive = index === 0;
                return (
                  <li key={index}>
                    <FilterButton isActive={isActive} label={filter} />
                  </li>
                );
              })}
            </ul>
          </nav>
          <AddCompanyButton />
        </div>

        <section
          aria-label="Job applications"
          className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[1.2fr_1.4fr_1fr_1.2fr_1.5fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4">
              {tableTitles.map((title) => (
                <div key={title} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {title}
                </div>
              ))}
            </div>
            <Suspense fallback={<p>Loading companies...</p>}>
              <CompanyListLoader />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}
