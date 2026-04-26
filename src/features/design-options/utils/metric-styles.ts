import type { Level } from "./metric-levels";

export type MetricVariant = "positive" | "negative";

export const levelStyles: Record<MetricVariant, Record<Level, string>> = {
  negative: {
    low: "bg-green-50 text-green-700 border-green-200",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    high: "bg-red-50 text-red-700 border-red-200",
  },
  positive: {
    low: "bg-red-50 text-red-700 border-red-200",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    high: "bg-green-50 text-green-700 border-green-200",
  },
};