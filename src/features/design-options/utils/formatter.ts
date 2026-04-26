// Handling when arrays come in, being able to display each value separated by a comma
export const parseCommaSeparatedList = (value: string) => {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

// Format metrics while handling exceptions
export const hasValidPositiveMetric = (value: number) => value > 0;

export const fallbackMetricStyle =
  "bg-muted text-muted-foreground border-border";

export const formatMetric = (value: number, suffix = "") => {
  return hasValidPositiveMetric(value) ? `${value}${suffix}` : "-";
};

export const formatCost = (value: number) => {
  return hasValidPositiveMetric(value)
    ? `€${value.toLocaleString()}`
    : "-";
};