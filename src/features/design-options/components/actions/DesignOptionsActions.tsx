"use client";

import { Button } from "@/components/ui/button";

type DesignOptionsActionsProps = {
  onCreate: () => void;
  onCompare: () => void;
  onRemoveSelection: () => void;
  onImport: () => void; // 👈 NUEVO
  selectedCount: number;
};

export const DesignOptionsActions = ({
  onCreate,
  onCompare,
  onRemoveSelection,
  onImport,
  selectedCount,
}: DesignOptionsActionsProps) => {
 return (
  <div className="flex flex-col gap-3 md:flex-row md:justify-between">
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:flex md:gap-5">
      <Button
        className="w-full cursor-pointer md:w-auto"
        variant="default"
        size="xl"
        onClick={onCreate}
      >
        Create new
      </Button>

      <Button
        className="w-full cursor-pointer md:w-auto"
        variant="secondary"
        size="xl"
        onClick={onImport}
      >
        Import
      </Button>

      <Button
        className="w-full cursor-pointer md:w-auto"
        variant="outline"
        size="xl"
        onClick={onCompare}
        disabled={selectedCount < 2}
      >
        Compare ({selectedCount})
      </Button>
    </div>

    <div className="w-full md:w-auto">
      <Button
        className="w-full cursor-pointer md:w-auto"
        variant="destructive"
        size="xl"
        onClick={onRemoveSelection}
        disabled={selectedCount === 0}
      >
        Remove selection
      </Button>
    </div>
  </div>
);
};
