import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader } from '../ui/card';
import { SectionHeading } from '../shared/SectionHeading';
import { ChartTooltip, type TooltipPayloadItem } from '../shared/ChartTooltip';

export interface GameTypeEntry {
  name: string;
  count: number;
  color: string;
}

interface GameTypePopularityProps {
  data: GameTypeEntry[];
  totalGames: number;
}

export function GameTypePopularity({ data, totalGames }: GameTypePopularityProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <SectionHeading
          title="Game Type Popularity"
          sub="How many games of each format were played"
        />
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-6">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              labelLine={false}
              label={PieSliceLabel as unknown as boolean}
              strokeWidth={0}
            >
              {data.map((e) => (
                <Cell key={e.name} fill={e.color} />
              ))}
            </Pie>
            <Tooltip
              content={(p) => (
                <ChartTooltip
                  active={p.active}
                  payload={p.payload as unknown as TooltipPayloadItem[]}
                  label={p.label as string}
                  formatter={(v) => `${v} games`}
                />
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Summary tiles — also act as the legend */}
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
          {data.map((e) => (
            <div
              key={e.name}
              className="p-3 rounded-lg border border-border bg-[#1a1a1a] flex-shrink-0"
              style={{ borderLeftColor: e.color, borderLeftWidth: '3px' }}
            >
              <div className="flex justify-between items-center mb-1">
                <p className="text-muted-foreground text-xs font-medium truncate pr-2">{e.name}</p>
                <p className="text-muted-foreground text-xs shrink-0">
                  {((e.count / totalGames) * 100).toFixed(1)}%
                </p>
              </div>
              <p className="text-foreground text-lg font-bold tabular-nums">{e.count}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Pie slice label — renders count inside each slice ─────────────────────────
interface PieSliceLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  value: number;
}

function PieSliceLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
}: PieSliceLabelProps) {
  if (percent < 0.07) return null;
  const R = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  return (
    <text
      x={cx + r * Math.cos(-midAngle * R)}
      y={cy + r * Math.sin(-midAngle * R)}
      fill="#121212"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: '12px', fontWeight: 700 }}
    >
      {value}
    </text>
  );
}
