import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

interface Props {
  steps: string[];
  current: number;
}

export function Stepper({ steps, current }: Props) {
  return (
    <div className="flex w-full items-center justify-between">
      {steps.map((step, idx) => {
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition",
                  done
                    ? "border-gold bg-gold text-obsidian"
                    : active
                    ? "border-gold text-gold"
                    : "border-white/10 text-chrome"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              <span
                className={cn(
                  "hidden text-[10px] uppercase tracking-widest md:block",
                  active ? "text-warm-white" : "text-chrome"
                )}
              >
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-px flex-1 transition md:mx-4",
                  done ? "bg-gold" : "bg-white/10"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
