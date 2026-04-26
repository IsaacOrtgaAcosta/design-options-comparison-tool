import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DesignOption } from "../../types";
import { ComparisonOptionCard } from "./ComparisonOptionCard";
import { EmptyComparisonState } from "../states/EmptyComparisonState";

type ComparisonPanelProps = {
  options: DesignOption[];
};

export const ComparisonPanel = ({ options }: ComparisonPanelProps) => {
  const hasOptions = options.length >= 2;

  return (
    <Card className="mt-8 min-h-70">
      <CardHeader className="flex flex-col items-center justify-center text-center mt-5">
        <CardTitle className="text-2xl font-bold">Comparison</CardTitle>

        {!hasOptions && (
          <EmptyComparisonState />
        )}
      </CardHeader>

      {hasOptions && (
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {options.map((option) => (
              <ComparisonOptionCard key={option.id} option={option} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};


