import { parseSqliteDate } from "@/src/app/lib/format";
import { Company } from "@/src/app/lib/types";

export type WeekGroup = {
  key: string;
  label: string;
  companies: Company[];
};

// Maandag 00:00 (lokale tijd) van de week waarin de datum valt.
// getDay() geeft zondag = 0, maandag = 1, ... dus (+6) % 7 = aantal dagen sinds maandag.
function startOfWeek(date: Date): Date {
  const monday = new Date(date);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return monday;
}

function formatDay(date: Date, withYear = false): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", ...(withYear && { year: "numeric" }) });
}

// De datum waarop een bedrijf ons afwees. Oudere data zonder rejected_at valt terug op updated_at.
export function rejectedDate(company: Company): string {
  return company.rejectedAt ?? company.updatedAt;
}

// Verdeelt de bedrijven in groepjes per week, op basis van de rejected-datum.
// De volgorde van de lijst blijft behouden, dus sorteer vooraf (nieuwste eerst).
export function groupByWeek(companies: Company[]): WeekGroup[] {
  const groups: WeekGroup[] = [];

  for (const company of companies) {
    const monday = startOfWeek(parseSqliteDate(rejectedDate(company), true));
    const key = monday.toISOString();
    const lastGroup = groups.at(-1);

    if (lastGroup && lastGroup.key === key) {
      lastGroup.companies.push(company);
      continue;
    }

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    groups.push({
      key,
      label: `Week of ${formatDay(monday)} – ${formatDay(sunday, true)}`,
      companies: [company],
    });
  }

  return groups;
}

// Verdeelt de weken over pagina's zonder ooit een week te splitsen.
// Een pagina vult zich met hele weken tot maxPerPage bedrijven; past de volgende week er niet meer bij,
// dan begint een nieuwe pagina. Een week die op zich al groter is, krijgt gewoon een eigen pagina.
export function paginateWeeks(weeks: WeekGroup[], maxPerPage: number): WeekGroup[][] {
  const pages: WeekGroup[][] = [];
  let currentPage: WeekGroup[] = [];
  let count = 0;

  for (const week of weeks) {
    if (currentPage.length > 0 && count + week.companies.length > maxPerPage) {
      pages.push(currentPage);
      currentPage = [];
      count = 0;
    }
    currentPage.push(week);
    count += week.companies.length;
  }

  if (currentPage.length > 0) pages.push(currentPage);
  return pages;
}
