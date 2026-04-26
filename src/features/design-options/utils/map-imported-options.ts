import type { DesignOption } from "@/features/design-options/types";

// External API data can be incomplete or nullable, so this type represents
// the raw shape before normalization.
type ImportedDesignOption = {
  id?: string | number;
  name?: string | null;
  description?: string | null;
  area?: string | null;
  embodied_carbon?: number | null;
  daylight_score?: number | null;
  cost_estimate?: number | null;
  program_fit?: number | null;
  tags?: string[] | null;
  notes?: string | null;
  pros?: string[] | null;
  cons?: string[] | null;
  reference_url?: string[] | null;
};

const toNumber = (
  value: number | null | undefined,
  fallback: number,
): number => {
  return typeof value === "number" && !Number.isNaN(value) ? value : fallback;
};

const toString = (
  value: string | null | undefined,
  fallback: string,
): string => {
  return value?.trim() || fallback;
};

const toStringArray = (value: string[] | null | undefined): string[] => {
  return Array.isArray(value) ? value.filter(Boolean) : [];
};

export function mapImportedOptions(
  options: ImportedDesignOption[],
): DesignOption[] {
  return options.map((option) => ({
    id: `imported-${option.id ?? crypto.randomUUID()}`,

    name: toString(option.name, "Untitled"),
    description: toString(option.description, "No description"),
    area: toString(option.area, "Unspecified"),

    embodiedCarbon: toNumber(option.embodied_carbon, 0),
    daylightScore: toNumber(option.daylight_score, 0),
    costEstimate: toNumber(option.cost_estimate, 0),
    programFit: toNumber(option.program_fit, 0),

    tags: toStringArray(option.tags),
    notes: option.notes?.trim() || "",

    source: "imported" as const,

    pros: toStringArray(option.pros),
    cons: toStringArray(option.cons),

    referenceUrl: toStringArray(option.reference_url),

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}