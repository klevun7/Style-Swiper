import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PreferenceSliderProps {
  title: string;
  min: number;
  max: number;
  step: number;
  value: number[];
  onChange: (value: number[]) => void;
  formatValue?: (value: number) => string;
}

const PreferenceSlider: React.FC<PreferenceSliderProps> = ({
  title,
  min,
  max,
  step,
  value,
  onChange,
  formatValue = (val) => `${val}`,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <Label>{title}</Label>
        <span className="text-sm font-medium">
          {formatValue(value[0])}
          {value.length > 1 && ` - ${formatValue(value[1])}`}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onChange}
        className="preference-slider"
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">{formatValue(min)}</span>
        <span className="text-xs text-gray-500">{formatValue(max)}</span>
      </div>
    </div>
  );
};

export default PreferenceSlider;