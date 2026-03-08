import { Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { SectionHeading } from '../shared/SectionHeading';

export interface PlayerStat {
  rank: number;
  name: string;
  tripleRate: number;   // 0–100 %
  doubleRate: number;
  missRate: number;
  totalThrows: number;
}

interface TopPlayersLeaderboardProps {
  players: PlayerStat[];
  /** How many players to show. Defaults to 5. */
  n?: number;
}

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

/** Inline progress bar — width driven by a 0–100 value. */
function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-[#2a2a2a] overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color }}
      />
    </div>
  );
}

/**
 * Ranked leaderboard for the top N players by triple rate.
 * Intentionally shows no more than `n` rows — never renders all players.
 */
export function TopPlayersLeaderboard({ players, n = 5 }: TopPlayersLeaderboardProps) {
  const top = players.slice(0, n);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <SectionHeading
            title={`Top ${n} Players`}
            sub="Ranked by triple rate · all games combined"
          />
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Trophy className="w-4 h-4" />
            <span>Triple rate</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-1 pt-0">
        {/* Column headers */}
        <div className="grid grid-cols-[2rem_1fr_3.5rem_3.5rem_3.5rem] gap-x-4 pb-2 border-b border-border">
          <span />
          <span className="text-xs text-muted-foreground">Player</span>
          <span className="text-xs text-muted-foreground text-right">T%</span>
          <span className="text-xs text-muted-foreground text-right">D%</span>
          <span className="text-xs text-muted-foreground text-right">Miss%</span>
        </div>

        {top.map((p) => (
          <div
            key={p.name}
            className="grid grid-cols-[2rem_1fr_3.5rem_3.5rem_3.5rem] gap-x-4 items-center py-2.5 border-b border-border/40 last:border-0"
          >
            {/* Rank */}
            <span className="text-sm text-center select-none">
              {MEDAL[p.rank] ?? (
                <span className="text-muted-foreground tabular-nums">{p.rank}</span>
              )}
            </span>

            {/* Name + bar */}
            <div className="min-w-0">
              <p className="text-foreground text-sm truncate">{p.name}</p>
              <div className="mt-1.5">
                <Bar value={p.tripleRate} color="var(--chart-4)" />
              </div>
            </div>

            {/* Triple % */}
            <span className="text-right text-sm tabular-nums" style={{ color: 'var(--chart-4)' }}>
              {p.tripleRate.toFixed(1)}
            </span>

            {/* Double % */}
            <span className="text-right text-sm tabular-nums text-muted-foreground">
              {p.doubleRate.toFixed(1)}
            </span>

            {/* Miss % */}
            <span className="text-right text-sm tabular-nums text-muted-foreground">
              {p.missRate.toFixed(1)}
            </span>
          </div>
        ))}

        <p className="text-xs text-muted-foreground pt-2">
          Showing top {top.length} of {players.length} players by triple rate
        </p>
      </CardContent>
    </Card>
  );
}
