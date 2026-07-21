import { Check, Clock, Image as ImageIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import type { ProductionStage } from "@/types";

interface Props {
  stages: ProductionStage[];
}

export function ProductionTracker({ stages }: Props) {
  const completed = stages.filter((s) => s.completed).length;
  const percent = Math.round((completed / stages.length) * 100);

  return (
    <div className="rounded-2xl border border-white/10 bg-charcoal/50 p-6 md:p-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-chrome">Production Progress</p>
          <h3 className="mt-1 font-display text-2xl text-warm-white">{percent}% Complete</h3>
        </div>
        <span className="text-sm text-cream/70">
          {completed} of {stages.length} stages
        </span>
      </div>
      <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-gold transition-all duration-1000"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="relative space-y-0">
        {stages.map((stage, idx) => {
          const isLast = idx === stages.length - 1;
          return (
            <div key={stage.name} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast && (
                <div
                  className={cn(
                    "absolute left-[15px] top-8 w-px",
                    stage.completed ? "bg-gold" : "bg-white/10"
                  )}
                  style={{ height: "calc(100% - 1rem)" }}
                />
              )}
              <div
                className={cn(
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                  stage.completed
                    ? "border-gold bg-gold text-obsidian"
                    : "border-white/10 bg-charcoal text-chrome"
                )}
              >
                {stage.completed ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p
                    className={cn(
                      "font-medium",
                      stage.completed ? "text-warm-white" : "text-chrome"
                    )}
                  >
                    {stage.name}
                  </p>
                  {stage.estimated && (
                    <span className="text-xs text-chrome">{stage.estimated}</span>
                  )}
                </div>
                {stage.notes && <p className="mt-1 text-sm text-cream/60">{stage.notes}</p>}
                {stage.media && stage.media.length > 0 && (
                  <div className="mt-3 flex gap-2">
                    {stage.media.map((_m, i) => (
                      <div
                        key={i}
                        className="flex h-16 w-16 items-center justify-center rounded-md bg-obsidian text-chrome"
                      >
                        <ImageIcon className="h-5 w-5" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
