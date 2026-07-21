export function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function addDays(d: Date, n: number) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

export function addMonths(d: Date, n: number) {
  const copy = new Date(d);
  copy.setMonth(copy.getMonth() + n);
  return copy;
}

/** Monday-based start of week. */
export function startOfWeek(d: Date) {
  const copy = startOfDay(d);
  const day = (copy.getDay() + 6) % 7; // 0 = Monday
  return addDays(copy, -day);
}

export function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

/** 6-week (42 day) grid starting on the Monday on/before the 1st of the month. */
export function monthGridDays(monthAnchor: Date) {
  const first = startOfMonth(monthAnchor);
  const gridStart = startOfWeek(first);
  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
}
