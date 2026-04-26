import { fallbackMetricStyle } from "../../utils/formatter";
import type { Level } from "../../utils/metric-levels";
import { levelStyles } from "../../utils/metric-styles";

type MetricBadgeProps = {
  label: string;
  value: string;
  level: Level;
  variant: "positive" | "negative";
  isMissing?: boolean;
};

export const MetricBadge = ({
  label,
  value,
  level,
  variant,
  isMissing,
}: MetricBadgeProps) => {
  return (
    <div   className={`rounded-lg border p-3 ${
    isMissing ? fallbackMetricStyle : levelStyles[variant][level]
  }`}>
      <p className="text-xs opacity-70">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
};