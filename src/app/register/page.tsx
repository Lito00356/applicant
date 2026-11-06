import RegisterForm from "@/src/app/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-slate-50 px-4 pt-12 sm:items-center sm:pt-0">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Create account</h1>
        <RegisterForm />
      </div>
    </main>
  );
}
