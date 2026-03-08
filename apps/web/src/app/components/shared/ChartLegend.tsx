interface LegendItem {
  value: string;
  color: string;
  /** Extra data bubbled up by recharts (e.g. `payload.count` for pie slices). */
  payload?: Record<string, unknown>;
}

interface ChartLegendProps {
  payload?: LegendItem[];
  layout?: 'horizontal' | 'vertical';
  /** If provided, renders an extra value next to each label (e.g. count). */
  extraKey?: string;
}

/**
 * Reusable recharts `Legend` content renderer.
 *
 * - `layout="horizontal"` (default) — row of pills, centred below chart
 * - `layout="vertical"` — stacked column, suitable for pie legends
 */
export function ChartLegend({ payload, layout = 'horizontal', extraKey }: ChartLegendProps) {
  if (!payload?.length) return null;

  if (layout === 'vertical') {
    return (
      <div className="flex flex-col gap-2 pl-4">
        {payload.map((e) => (
          <div key={e.value} className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: e.color }} />
            <span className="text-foreground text-sm">{e.value}</span>
            {extraKey && (
              <span className="text-muted-foreground text-sm ml-auto tabular-nums">
                {String(e.payload?.[extraKey] ?? '')}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-wrap gap-4 mt-2">
      {payload.map((e) => (
        <div key={e.value} className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: e.color }} />
          {e.value}
        </div>
      ))}
    </div>
  );
}
