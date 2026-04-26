"use client";

import { useState, useEffect } from "react";
import type { DesignOption } from "../types";
import { DesignOptionGrid } from "./lists/DesignOptionGrid";
import { DesignOptionsActions } from "./actions/DesignOptionsActions";
import { Spinner } from "@/components/ui/spinner";
import { mapDbToDesignOption } from "../utils/map-db-to-design-options";
import {
  createDesignOptions,
  getDesignOptionsPage,
} from "../services/design-options.service";
import { DesignOptionDetailsDialog } from "./details/DesignOptionDetailsDialog";
import { CreateDesignOptionDialog } from "./forms/CreateDesignOptionDialog";
import { ComparisonPanel } from "./ui/ComparisonPanel";
import { useRef } from "react";
import { fetchImportedOptions } from "../services/fetch-imported-options";
import { EmptyDesignOptionsState } from "./states/EmptyDesignOptionsState";
import { mapDesignOptionToDb } from "../utils/map-design-option-to-db";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const DesignOptionsDashboard = () => {
  const [options, setOptions] = useState<DesignOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<DesignOption | null>(
    null,
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [comparisonOptions, setComparisonOptions] = useState<DesignOption[]>(
    [],
  );
  const [importPage, setImportPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDesignOptions = async () => {
      try {
        setIsLoading(true);
        const data = await getDesignOptionsPage(1);
        if (error) {
          throw error;
        }
        setOptions((data ?? []).map(mapDbToDesignOption));
      } catch (error) {
        setError("Failed to load design options");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDesignOptions();
  }, []);

  const handleOpenDetails = (option: DesignOption) => {
    setSelectedOption(option);
  };

  const handleCloseDetails = () => {
    setSelectedOption(null);
  };

  // COMPARISON:
  const comparisonRef = useRef<HTMLDivElement | null>(null);

  const handleToggleCompareSelection = (optionId: string, checked: boolean) => {
    setSelectedOptionIds((prev) => {
      if (checked) {
        if (prev.length >= 4) return prev;
        return [...prev, optionId];
      }

      return prev.filter((id) => id !== optionId);
    });
  };
  const handleCompare = () => {
    if (selectedOptionIds.length < 2) return;

    const selectedOptions = options.filter((option) =>
      selectedOptionIds.includes(option.id),
    );

    setComparisonOptions(selectedOptions);

    // Automatic scroll to the comparison panel
    setTimeout(() => {
      comparisonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // IMPORT FROM AN EXTERNAL API:
  const handleImport = async () => {
    try {
      setIsLoading(true);

      const imported = await fetchImportedOptions(importPage);

      const payload = imported.map(mapDesignOptionToDb);

      const savedRows = await createDesignOptions(payload);

      const savedOptions = savedRows.map(mapDbToDesignOption);

      setOptions((prev) => [...savedOptions, ...prev]);
      setImportPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      setError("Failed to import options");
    } finally {
      setIsLoading(false);
    }
  };

  // REMOVE SELECTED TO COMPARISON:
  const handleRemoveSelection = () => {
    setSelectedOptionIds([]);
    setComparisonOptions([]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  // We display the errors in an alert.
  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center align-middle">
      <div className="mt-5">
        <div className="mb-4">
          <DesignOptionsActions
            onCreate={() => setIsCreateDialogOpen(true)}
            onCompare={handleCompare}
            onRemoveSelection={handleRemoveSelection}
            onImport={handleImport}
            selectedCount={selectedOptionIds.length}
          />
        </div>
        <CreateDesignOptionDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreated={(createdOption) => {
            setOptions((prev) => [createdOption, ...prev]);
          }}
        />
        {options.length === 0 ? (
          <EmptyDesignOptionsState />
        ) : (
          <DesignOptionGrid
            options={options}
            onOptionClick={handleOpenDetails}
            selectedOptionIds={selectedOptionIds}
            onToggleCompareSelection={handleToggleCompareSelection}
          />
        )}
        <div ref={comparisonRef}>
          <ComparisonPanel options={comparisonOptions} />
        </div>
        <DesignOptionDetailsDialog
          option={selectedOption}
          open={selectedOption !== null}
          onOpenChange={(open) => {
            if (!open) handleCloseDetails();
          }}
        />
      </div>
    </div>
  );
};
