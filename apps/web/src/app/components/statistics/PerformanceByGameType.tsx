import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader } from '../ui/card';
import { SectionHeading } from '../shared/SectionHeading';
import { ChartTooltip, type TooltipPayloadItem } from '../shared/ChartTooltip';
import { ChartLegend } from '../shared/ChartLegend';
import { cv } from '../../lib/chart-colors';

export interface GameTypePerformanceEntry {
  type: string;
  'Avg Score / Throw': number;
  'Miss Rate %': number;
  'Triple Rate %': number;
}

interface PerformanceByGameTypeProps {
  data: GameTypePerformanceEntry[];
}

/** Grouped bar chart comparing avg score, miss rate and triple rate per game format. */
export function PerformanceByGameType({ data }: PerformanceByGameTypeProps) {
  return (
    <Card>
      <CardHeader>
        <SectionHeading
          title="Performance by Game Type"
          sub="Avg score per throw, miss rate and triple rate by format"
        />
      </CardHeader>
      <CardContent>
        {/*
          Legend sits at the top so it never fights narrow X-axis space.
          height 300 is comfortable for grouped bars at any width since the
          game-type labels (501 / 301 / Cricket / 701) are short.
        */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="type"
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            />
            <Tooltip
              content={(p) => (
                <ChartTooltip
                  active={p.active}
                  payload={p.payload as unknown as TooltipPayloadItem[]}
                  label={p.label as string}
                  formatter={(v) => String(v)}
                />
              )}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: '12px' }}
              content={(p) => (
                <ChartLegend
                  payload={p.payload as Parameters<typeof ChartLegend>[0]['payload']}
                />
              )}
            />
            <Bar dataKey="Avg Score / Throw" fill={cv(0)} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Miss Rate %" fill={cv(4)} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Triple Rate %" fill={cv(3)} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
