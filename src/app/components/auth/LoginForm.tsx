"use client";

import { login } from "@/src/app/lib/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        E-mail
        <input
          name="email"
          type="email"
          required
          defaultValue={state?.email}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
        Password
        <input
          name="password"
          type="password"
          required
          minLength={3}
          className="rounded-lg border border-slate-300 px-3 py-2"
        />
      </label>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {isPending ? "Pending..." : "Login"}
      </button>

      <p className="text-sm text-slate-500">
        No account yet?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
