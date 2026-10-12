import { useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: NoInfer<T>) => void;
  disabled?: boolean;
  className?: string;
};

/** Pill-shaped single-choice toggle with a sliding indicator. */
export function Segmented<T extends string>({ label, options, value, onChange, disabled, className }: Props<T>) {
  const layoutId = useId();
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("inline-flex rounded-full border p-0.5 font-mono text-[11.5px]", disabled && "opacity-50", className)}
    >
      {options.map((option) => {
        const selected = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            disabled={disabled}
            onClick={() => onChange(option)}
            className="relative rounded-full px-2.5 py-1 transition-colors disabled:cursor-not-allowed"
          >
            {selected && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              />
            )}
            <span className={cn("relative", selected ? "text-background" : "text-muted-foreground hover:text-foreground")}>
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
}
