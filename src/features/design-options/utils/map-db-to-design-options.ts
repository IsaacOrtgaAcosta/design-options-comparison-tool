import { DesignOption } from "../types";
// We need to adapt how the keys are received in snake_case from Supabase to camelCase in JavaScript
export const mapDbToDesignOption = (row: any): DesignOption => {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    area: row.area,

    embodiedCarbon: row.embodied_carbon,
    daylightScore: row.daylight_score,
    costEstimate: row.cost_estimate,
    programFit: row.program_fit,

    tags: row.tags ?? [],
    notes: row.notes ?? '',

    source: row.source,

    pros: row.pros ?? [],
    cons: row.cons ?? [],

    referenceUrl: row.reference_url ?? [],

    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};