// SQLite geeft datums terug als tekst, bv. "2026-10-16 14:25:32".
// CURRENT_TIMESTAMP (created_at/updated_at) is UTC; zelf ingevulde datums zijn lokale tijd.
function parseSqliteDate(value: string, isUtc: boolean): Date {
  const iso = value.replace(" ", "T");
  return new Date(isUtc && !iso.endsWith("Z") ? `${iso}Z` : iso);
}

export function formatDate(value: string, { isUtc = false } = {}): string {
  return parseSqliteDate(value, isUtc).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(value: string, { isUtc = false } = {}): string {
  return parseSqliteDate(value, isUtc).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
