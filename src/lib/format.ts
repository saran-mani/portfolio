const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-07" -> Date at the first of that month (local time). */
export const monthStart = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1);
};

/** "2025-07" -> first day of the *following* month, i.e. an inclusive end. */
export const monthEnd = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m, 1);
};

/** "2025-07" -> "Jul 2025" */
export const formatMonth = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};

export const formatPeriod = (start: string, end: string | null) =>
  `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;

/** Whole months between two dates, e.g. for "2 yrs 3 mos". */
export const monthsBetween = (from: Date, to: Date) =>
  Math.max(0, (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()));

export const formatDuration = (months: number) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest || !years) parts.push(`${rest} mo${rest === 1 ? "" : "s"}`);
  return parts.join(" ");
};

export const formatBytes = (bytes: number) =>
  bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} kB`;

export const formatMs = (ms: number) => (ms < 10 ? ms.toFixed(1) : Math.round(ms).toString());

/** HH:MM:SS.mmm for log lines. */
export const formatClock = (date: Date) =>
  `${date.toLocaleTimeString("en-GB", { hour12: false })}.${String(date.getMilliseconds()).padStart(3, "0")}`;
