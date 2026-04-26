export type Level = "low" | "medium" | "high";

export const getCarbonLevel = (value: number): Level =>
  value < 300 ? "low" : value < 600 ? "medium" : "high";

export const getDaylightLevel = (value: number): Level =>
  value >= 8 ? "high" : value >= 5 ? "medium" : "low";

export const getCostLevel = (value: number): Level =>
  value < 800_000 ? "low" : value < 1_500_000 ? "medium" : "high";

export const getProgramFitLevel = (value: number): Level =>
  value >= 8 ? "high" : value >= 5 ? "medium" : "low";