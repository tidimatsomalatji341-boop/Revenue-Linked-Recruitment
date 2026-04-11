import { useMemo } from "react";

interface BillingProgressBarProps {
  value: number; // 0-100
  label?: string;
}

const BillingProgressBar = ({ value, label }: BillingProgressBarProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const barColor = useMemo(() => {
    if (clampedValue < 40) return "bg-progress-danger";
    if (clampedValue < 70) return "bg-progress-warning";
    return "bg-progress-success";
  }, [clampedValue]);

  const glowColor = useMemo(() => {
    if (clampedValue < 40) return "shadow-[0_0_12px_hsl(var(--progress-danger)/0.5)]";
    if (clampedValue < 70) return "shadow-[0_0_12px_hsl(var(--progress-warning)/0.5)]";
    return "shadow-[0_0_12px_hsl(var(--progress-success)/0.5)]";
  }, [clampedValue]);

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <span className="text-sm font-mono text-foreground">{clampedValue}%</span>
        </div>
      )}
      <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor} ${glowColor}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

export default BillingProgressBar;
