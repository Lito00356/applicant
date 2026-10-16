import RegisterForm from "@/src/app/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Account aanmaken</h1>
        <RegisterForm />
      </div>
    </main>
  );
}
