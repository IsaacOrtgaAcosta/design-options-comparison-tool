"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DesignOption } from "../../types";
import { Checkbox } from "@/components/ui/checkbox";
import { MetricBadge } from "./MetricBadge";
import {
  getCarbonLevel,
  getCostLevel,
  getDaylightLevel,
  getProgramFitLevel,
} from "../../utils/metric-levels";
import { formatCost, formatMetric, hasValidPositiveMetric } from "../../utils/formatter";

type OptionCardProps = {
  option: DesignOption;
  onClick: () => void;
  isSelected: boolean;
  onToggleCompareSelection: (optionId: string, checked: boolean) => void;
};

export const DesignOptionCard = ({
  option,
  onClick,
  isSelected,
  onToggleCompareSelection,
}: OptionCardProps) => {
  return (
    <Card
      className="cursor-pointer transition hover:shadow-md"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex flex-row justify-between">
          <div>
            <CardTitle className="text-lg font-bold">
              {option.name || "Untitled"}
            </CardTitle>
            <CardDescription>
              {option.description || "No description"}
            </CardDescription>
          </div>
          <div>
            <Checkbox
              checked={isSelected}
              className="h-6 w-6 cursor-pointer border-gray-400"
              onClick={(e) => e.stopPropagation()}
              onCheckedChange={(checked) => {
                onToggleCompareSelection(option.id, checked === true);
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <MetricBadge
            label="Carbon"
            value={formatMetric(option.embodiedCarbon, " kg")}
            level={getCarbonLevel(option.embodiedCarbon)}
            variant="negative"
            isMissing={!hasValidPositiveMetric(option.embodiedCarbon)}
          />

          <MetricBadge
            label="Daylight"
            value={formatMetric(option.daylightScore, "/10")}
            level={getDaylightLevel(option.daylightScore)}
            variant="positive"
            isMissing={!hasValidPositiveMetric(option.daylightScore)}
          />

          <MetricBadge
            label="Cost"
            value={formatCost(option.costEstimate)}
            level={getCostLevel(option.costEstimate)}
            variant="negative"
            isMissing={!hasValidPositiveMetric(option.costEstimate)}
          />

          <MetricBadge
            label="Program fit"
            value={formatMetric(option.programFit, "/10")}
            level={getProgramFitLevel(option.programFit)}
            variant="positive"
            isMissing={!hasValidPositiveMetric(option.programFit)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
