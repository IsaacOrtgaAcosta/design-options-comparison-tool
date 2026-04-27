"use client";

import { useMemo, useState } from "react";
import type { DesignOption } from "@/features/design-options/types";

type UseCompareSelectionParams = {
    options: DesignOption[];
    maxSelections?: number;
};

export const useCompareSelection = ({  
    options,
    maxSelections = 4,
}: UseCompareSelectionParams) => {
    const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
    const [comparedOptionsIds, setComparedOptionsIds] = useState<string[]>([]);

    const toggleSelection = (optionId: string, checked: boolean) => {
        setSelectedOptionIds((prev) => {
            if(checked){
                if(prev.length >= maxSelections) return prev;
                return [...prev, optionId];
            }
            return prev.filter((id) => id !== optionId);
        });
    };

    const compare = () => {
        if(selectedOptionIds.length < 2) return;
        setComparedOptionsIds(selectedOptionIds);
    }

    const clearSelection = () => {
        setSelectedOptionIds([]);
        setComparedOptionsIds([]);
    };

    const comparisonOptions = useMemo(() => {
        if(comparedOptionsIds.length < 2) return [];
        return options.filter((option) => comparedOptionsIds.includes(option.id));
    }, [options, comparedOptionsIds]);

    return {
        selectedOptionIds,
        selectedCount: selectedOptionIds.length,
        comparisonOptions,
        toggleSelection,
        compare,
        clearSelection,
    };
}