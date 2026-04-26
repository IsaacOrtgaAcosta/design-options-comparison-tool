import { supabase } from "@/supabaseClient";

const PAGE_SIZE = 10;

export type CreateDesignOptionPayload = {
  name: string;
  description: string;
  area: string;
  embodied_carbon: number;
  daylight_score: number;
  cost_estimate: number;
  program_fit: number;
  tags: string[];
  notes?: string;
  source: "manual" | "imported";
  pros: string[];
  cons: string[];
  reference_url: string[];
};

export const getDesignOptionsPage = async (page: number) => {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("design_options")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

    if(error) throw error;

    return data ?? [];
};


export const createDesignOption = async (
  payload: CreateDesignOptionPayload,
) => {
  const { data, error } = await supabase
    .from("design_options")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// Insert multiple to save new entries from external API
export const createDesignOptions = async (
  payload: CreateDesignOptionPayload[],
) => {
  const { data, error } = await supabase
    .from("design_options")
    .insert(payload)
    .select();

  if (error) throw error;

  return data ?? [];
};