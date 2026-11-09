import CompanyList from "@/src/app/components/company/CompanyList";
import { getCompanies } from "@/src/app/lib/companies";
import { ROW_GRID, TABLE_TITLES } from "@/src/app/lib/constants";

const ArchiveListLoader = async () => {
  const archivedCompanies = (await getCompanies({ archived: true })).toSorted((a, b) =>
    a.name.localeCompare(b.name, "nl", { sensitivity: "base" }),
  );

  return (
    <section
      aria-label="Archived applications"
      className="flex flex-1 flex-col overflow-x-auto rounded-xl bg-surface px-3 pb-5 pt-3 sm:px-5 sm:pt-5"
    >
      <div className="md:min-w-190">
        <div className="hidden md:block">
          <div className={`${ROW_GRID} px-3 pb-4`}>
            {TABLE_TITLES.map((title) => (
              <div key={title} className="text-base font-semibold text-slate-950">
                {title}
              </div>
            ))}
          </div>
        </div>

        {archivedCompanies.length > 0 ? (
          <CompanyList companies={archivedCompanies} />
        ) : (
          <p className="px-3 py-6 text-sm text-slate-500">No archived companies yet.</p>
        )}
      </div>
    </section>
  );
};

export default ArchiveListLoader;
