"use client";

import { useEffect, useRef } from "react";
import { DesignOption } from "../../types";
import { DesignOptionCard } from "../ui/DesignOptionCard";

type OptionsGridProps = {
  options: DesignOption[];
  onOptionClick: (option: DesignOption) => void;
  selectedOptionIds: string[];
  onToggleCompareSelection: (optionId: string, checked: boolean) => void;
};

export const DesignOptionGrid = ({
  options,
  onOptionClick,
  selectedOptionIds,
  onToggleCompareSelection
}: OptionsGridProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      if (window.innerWidth < 768) return;

      event.preventDefault();
      element.scrollLeft += event.deltaY;
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="
        w-full pb-4
        overflow-y-auto
        md:overflow-x-auto md:overflow-y-hidden
      "
    >
      <div
        className="
          grid gap-4
          grid-cols-1
          md:grid-flow-col md:grid-rows-2 md:auto-cols-[420px] md:grid-cols-none
          p-2
        "
      >
        {options.map((option) => (
          <DesignOptionCard
            key={option.id}
            option={option}
            onClick={() => onOptionClick(option)}
            isSelected={selectedOptionIds.includes(option.id)}
            onToggleCompareSelection={onToggleCompareSelection}
          />
        ))}
      </div>
    </div>
  );
};
