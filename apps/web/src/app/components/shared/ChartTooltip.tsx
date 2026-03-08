/** Shape recharts injects into tooltip `payload` items. */
export interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  /** Optional formatter applied to every numeric value. */
  formatter?: (value: number) => string;
}

/**
 * Drop-in Recharts `content` replacement with dark-mode styling.
 *
 * Usage:
 * ```tsx
 * <Tooltip content={(p) => <ChartTooltip {...p} formatter={(v) => `${v}%`} />} />
 * ```
 */
export function ChartTooltip({ active, payload, label, formatter }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-card border border-border rounded-lg px-4 py-3 text-sm shadow-lg min-w-[140px]">
      {label && <p className="text-foreground mb-2">{label}</p>}
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
            {p.name}
          </span>
          <span className="text-foreground tabular-nums">
            {formatter ? formatter(p.value) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}
