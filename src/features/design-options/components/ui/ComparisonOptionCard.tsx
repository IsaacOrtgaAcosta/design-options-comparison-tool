import type { DesignOption } from "../../types";
import {
  formatMetric,
  formatCost,
} from "../../utils/formatter";

type ComparisonOptionCardProps = {
  option: DesignOption;
};

export const ComparisonOptionCard = ({ option }: ComparisonOptionCardProps) => {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="text-lg font-bold">{option.name}</h3>
      <p className="text-sm text-muted-foreground">
        {option.description}
      </p>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Carbon</span>
          <strong>
            {formatMetric(option.embodiedCarbon, " kg")}
          </strong>
        </div>

        <div className="flex justify-between">
          <span>Cost</span>
          <strong>
            {formatCost(option.costEstimate)}
          </strong>
        </div>

        <div className="flex justify-between">
          <span>Daylight</span>
          <strong>
            {formatMetric(option.daylightScore, "/10")}
          </strong>
        </div>

        <div className="flex justify-between">
          <span>Program fit</span>
          <strong>
            {formatMetric(option.programFit, "/10")}
          </strong>
        </div>
      </div>
    </div>
  );
};