"use client";

import { useActionState, useEffect } from "react";
import { createCompany } from "@/src/app/lib/actions/companiesCRUD";
import { APPLICATION_METHODS, applicationMethodLabels, STATUSES, statusLabels } from "@/src/app/lib/constants";
import { CompanyFormProps } from "@/src/app/lib/types";

const labelClass = "flex flex-col gap-1 text-sm font-medium text-slate-700";
const inputClass = "rounded-lg border border-slate-300 px-3 py-2 font-normal";

const CompanyForm = ({ onSuccess, onCancel }: CompanyFormProps) => {
  const [state, formAction, isPending] = useActionState(createCompany, null);

  // Bij een fout geeft de actie de ingevulde waarden terug; anders zijn er geen.
  const values = state?.success === false ? state.values : undefined;
  const error = state?.success === false ? state.error : undefined;

  // Opgeslagen? Laat de ouder (de modal) weten dat hij mag sluiten.
  useEffect(() => {
    if (state?.success) onSuccess();
  }, [state, onSuccess]);

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

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-end gap-4">
        <button type="button" onClick={onCancel} className="text-sm text-slate-500 underline">
          Cancel
        </button>
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
