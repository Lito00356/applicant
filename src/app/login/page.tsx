import LoginForm from "@/src/app/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
