const formatter = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(date: Date) {
  return formatter.format(date);
}
