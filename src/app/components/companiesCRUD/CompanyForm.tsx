"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createCompany } from "@/src/app/lib/actions/companiesCRUD";
import { APPLICATION_METHODS, applicationMethodLabels, STATUSES, statusLabels } from "@/src/app/lib/constants";

const labelClass = "flex flex-col gap-1 text-sm font-medium text-slate-700";
const inputClass = "rounded-lg border border-slate-300 px-3 py-2 font-normal";

const CompanyForm = () => {
  const [state, formAction, isPending] = useActionState(createCompany, null);
  const values = state?.values;

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Vacancy</legend>

        <label className={labelClass}>
          Company *
          <input name="name" type="text" required defaultValue={values?.name} className={inputClass} />
        </label>

        <label className={labelClass}>
          Role *
          <input name="role" type="text" required defaultValue={values?.role} className={inputClass} />
        </label>

        <label className={labelClass}>
          Location
          <input name="location" type="text" defaultValue={values?.location} className={inputClass} />
        </label>

        <label className={labelClass}>
          Job URL
          <input name="jobUrl" type="url" placeholder="https://" defaultValue={values?.jobUrl} className={inputClass} />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          Company website
          <input
            name="websiteUrl"
            type="url"
            placeholder="https://"
            defaultValue={values?.websiteUrl}
            className={inputClass}
          />
        </label>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Application</legend>

        <label className={labelClass}>
          Status
          <select name="status" defaultValue={values?.status || "toContact"} className={inputClass}>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          Applied via
          <select name="applicationMethod" defaultValue={values?.applicationMethod ?? ""} className={inputClass}>
            <option value="">Not yet</option>
            {APPLICATION_METHODS.map((method) => (
              <option key={method} value={method}>
                {applicationMethodLabels[method]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
          <input name="isSpontaneous" type="checkbox" defaultChecked={values?.isSpontaneous} />
          Spontaneous application (no vacancy)
        </label>
      </fieldset>

      <fieldset className="grid gap-4">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Notes</legend>

        <label className={labelClass}>
          Cons
          <textarea name="cons" rows={3} defaultValue={values?.cons} className={inputClass} />
        </label>

        <label className={labelClass}>
          Rejection reason
          <textarea name="rejectionReason" rows={3} defaultValue={values?.rejectionReason} className={inputClass} />
        </label>
      </fieldset>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex items-center justify-end gap-4">
        <Link href="/" className="text-sm text-slate-500 underline">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Add company"}
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
