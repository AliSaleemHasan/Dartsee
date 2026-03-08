/** CSS variable references for all chart colours — single source of truth. */
export const CHART_VARS = [
  '--chart-1',
  '--chart-2',
  '--chart-3',
  '--chart-4',
  '--chart-5',
] as const;

/** Returns `var(--chart-N)` cycling through the palette. */
export function cv(index: number): string {
  return `var(${CHART_VARS[index % CHART_VARS.length]})`;
}
