import { DesignOption } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getCarbonLevel,
  getCostLevel,
  getDaylightLevel,
  getProgramFitLevel,
} from "../../utils/metric-levels";
import {
  fallbackMetricStyle,
  formatCost,
  formatMetric,
  hasValidPositiveMetric,
} from "../../utils/formatter";
import { levelStyles } from "../../utils/metric-styles";

type OptionDetailsDialogProps = {
  option: DesignOption | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DesignOptionDetailsDialog = ({
  option,
  open,
  onOpenChange,
}: OptionDetailsDialogProps) => {
  if (!option) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{option.name}</DialogTitle>
          <DialogDescription className="font-semibold">
            {option.description}
          </DialogDescription>
        </DialogHeader>

        <hr className="border-t border-gray-200 my-4" />

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-row justify-between">
            <span className="text-md font-bold">Embodied carbon</span>
            <span
              className={`rounded-md border px-2 py-1 text-sm font-medium ${
                hasValidPositiveMetric(option.embodiedCarbon)
                  ? levelStyles.negative[getCarbonLevel(option.embodiedCarbon)]
                  : fallbackMetricStyle
              }`}
            >
              {formatMetric(option.embodiedCarbon, " kg")}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="text-md font-bold">Cost</span>
            <span
              className={`rounded-md border px-2 py-1 text-sm font-medium ${
                hasValidPositiveMetric(option.costEstimate)
                  ? levelStyles.negative[getCostLevel(option.costEstimate)]
                  : fallbackMetricStyle
              }`}
            >
              {formatCost(option.costEstimate)}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="text-md font-bold">Daylight</span>
            {/* Daylight */}
            <span
              className={`rounded-md border px-2 py-1 text-sm font-medium ${
                hasValidPositiveMetric(option.daylightScore)
                  ? levelStyles.positive[getDaylightLevel(option.daylightScore)]
                  : fallbackMetricStyle
              }`}
            >
              {formatMetric(option.daylightScore, "/10")}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="text-md font-bold">Program fit</span>
            <span
              className={`rounded-md border px-2 py-1 text-sm font-medium ${
                hasValidPositiveMetric(option.programFit)
                  ? levelStyles.positive[getProgramFitLevel(option.programFit)]
                  : fallbackMetricStyle
              }`}
            >
              {formatMetric(option.programFit, "/10")}
            </span>
          </div>

          <hr className="border-t border-gray-200 my-4" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <span className="text-md font-bold">Pros</span>
              <div className="flex flex-wrap gap-2">
                {option.pros && option.pros.length > 0 ? (
                  option.pros.map((pros) => (
                    <span
                      key={pros}
                      className="rounded-md border px-2 py-1 text-xs font-medium bg-muted"
                    >
                      {pros}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">No pros</span>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <span className="text-md font-bold">Cons</span>
              <div className="flex flex-wrap gap-2">
                {option.cons && option.cons.length > 0 ? (
                  option.cons.map((cons) => (
                    <span
                      key={cons}
                      className="rounded-md border px-2 py-1 text-xs font-medium bg-muted"
                    >
                      {cons}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">No cons</span>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <span className="text-md font-bold">Tags</span>
              <div className="flex flex-wrap gap-2">
                {option.tags && option.tags.length > 0 ? (
                  option.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border px-2 py-1 text-xs font-medium bg-muted"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">No tags</span>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <span className="text-md font-bold">Notes</span>
              <span className="text-xs text-muted-foreground">
                {option.notes ? option.notes : "No notes"}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-md font-bold">Area:&nbsp;</p>
              <p className="text-xs text-muted-foreground">{option.area}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full flex-row justify-between gap-4">
            <div>
              {option.referenceUrl && option.referenceUrl.length > 0 ? (
                option.referenceUrl.map((url) => <p key={option.id}>{url}</p>)
              ) : (
                <p>No referring URL</p>
              )}
            </div>
            <div className="flex flex-row">
              <p className="font-semibold">Source:&nbsp;</p>
              <p>
                {option.source.charAt(0).toUpperCase() + option.source.slice(1)}
              </p>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
