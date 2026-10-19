import CompanyForm from "@/src/app/components/companiesCRUD/CompanyForm";

export default function AddCompanyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Add company</h1>
        <CompanyForm />
      </div>
    </main>
  );
}
