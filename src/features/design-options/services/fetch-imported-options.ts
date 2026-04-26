import { mapImportedOptions } from "../utils/map-imported-options";
import { DesignOption } from "../types";

const IMPORT_OPTIONS_ENDPOINT = process.env.NEXT_PUBLIC_IMPORT_OPTIONS_ENDPOINT;

export async function fetchImportedOptions(
  page: number,
): Promise<DesignOption[]> {

  // Since the API is a custom endpoint, it doesn't allow limiting the number of results. However, this should go here to avoid retrieving all available results at once
  const pageSize = 4;
  const from = (page - 1) * pageSize;
  const to = from + pageSize;

  if (!IMPORT_OPTIONS_ENDPOINT) {
    throw new Error("Missing NEXT_PUBLIC_IMPORT_OPTIONS_ENDPOINT");
  }
  try {
    const response = await fetch(
      IMPORT_OPTIONS_ENDPOINT,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch options");
    }

    const data = await response.json();
    // First we check if the endpoint is faulty:
    const rawOptions = data?.design_options ?? [];
    console.log("Imported options:", rawOptions);

    return mapImportedOptions(rawOptions.slice(from, to));
  } catch (error) {
    console.error("Import error:", error);
    throw error;
  }
}
