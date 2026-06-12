export function formatEventDate(fromDate: string, toDate: string) {
  const from = formatDate(fromDate);
  const to = formatDate(toDate);

  return fromDate === toDate ? from : `${from} - ${to}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
