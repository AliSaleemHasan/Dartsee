import type { ElementType } from 'react';

interface StatMiniCardProps {
  icon: ElementType;
  label: string;
  value: string | number;
}

/**
 * Small labelled stat tile.
 * Used in GameDetail player cards and PlayerHeatmap stats panel.
 */
export function StatMiniCard({ icon: Icon, label, value }: StatMiniCardProps) {
  return (
    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-foreground tabular-nums">{value}</p>
    </div>
  );
}
