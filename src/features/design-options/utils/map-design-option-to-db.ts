import type { DesignOption } from "../types";
import type { CreateDesignOptionPayload } from "../services/design-options.service";

export const mapDesignOptionToDb = (
  option: DesignOption,
): CreateDesignOptionPayload => {
  return {
    name: option.name,
    description: option.description,
    area: option.area,

    embodied_carbon: option.embodiedCarbon,
    daylight_score: option.daylightScore,
    cost_estimate: option.costEstimate,
    program_fit: option.programFit,

    tags: option.tags,
    notes: option.notes || undefined,

    source: option.source,

    pros: option.pros,
    cons: option.cons,

    reference_url: option.referenceUrl ?? [],
  };
};