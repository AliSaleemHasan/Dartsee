import { useMemo, Suspense, useEffect } from 'react';
import { toast } from 'sonner';
import { cv } from '../lib/chart-colors';
import { PageShell } from '../components/shared/PageShell';
import { GameTypePopularity } from '../components/statistics/GameTypePopularity';
import { TopPlayersLeaderboard } from '../components/statistics/TopPlayersLeaderboard';
import { PerformanceByGameType } from '../components/statistics/PerformanceByGameType';
import { Loader2 } from 'lucide-react';
import {
  useStatisticsPopularity,
  useStatisticsTopPlayers,
  useStatisticsGamePerformance
} from '../lib/queries';

const TOP_N = 5;

function StatisticsContent() {
  const { data: popularity, isError: errPop } = useStatisticsPopularity();
  const { data: topPlayers, isError: errTop } = useStatisticsTopPlayers();
  const { data: gamePerf, isError: errPerf } = useStatisticsGamePerformance();

  const isError = errPop || errTop || errPerf;

  useEffect(() => {
    if (isError) toast.error('Failed to load statistical data.');
  }, [isError]);

  if (isError || !popularity || !topPlayers || !gamePerf) {
    return (
      <div className="py-24 flex items-center justify-center text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
        Failed to load statistics. Please refresh.
      </div>
    );
  }

  // ── Game type popularity ──────────────────────────────────────────────────
  const gameTypeData = useMemo(() => {
    return popularity
      .sort((a, b) => b.count - a.count)
      .map((item, i) => ({
        name: item.gametype,
        count: item.count,
        color: cv(i),
      }));
  }, [popularity]);

  const totalGamesParsed = useMemo(() =>
    popularity.reduce((sum, item) => sum + item.count, 0)
    , [popularity]);

  // ── Top N players by triple rate ──────────────────────────────────────────
  const topPlayersData = useMemo(() => {
    return topPlayers.map((p, i) => ({
      name: p.playerName,
      tripleRate: p.tripleRate,
      doubleRate: p.doubleRate,
      missRate: p.missRate,
      totalThrows: 0, // Backend aggregate focuses strictly on hit percentages currently
      rank: i + 1,
    }));
  }, [topPlayers]);

  // ── Performance by game type ──────────────────────────────────────────────
  const gameTypePerfData = useMemo(() => {
    return gamePerf.map((perf) => ({
      type: perf.gameType,
      'Avg Score / Throw': perf.avgScorePerThrow,
      'Miss Rate %': perf.missRate,
      'Triple Rate %': perf.tripleRate,
    }));
  }, [gamePerf]);

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-foreground mb-1">Statistics</h2>
        <p className="text-muted-foreground text-sm">
          {totalGamesParsed} total games recorded
        </p>
      </div>

      <div className="space-y-6">
        {/* Row 1: game-type distribution + top-N player leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GameTypePopularity data={gameTypeData} totalGames={totalGamesParsed} />
          <TopPlayersLeaderboard players={topPlayersData} n={TOP_N} />
        </div>

        {/* Row 2: performance metrics by game format (fully aggregate — no player dimension) */}
        <PerformanceByGameType data={gameTypePerfData} />
      </div>
    </>
  );
}

export default function Statistics() {
  return (
    <PageShell className="px-4 sm:px-8 py-6 sm:py-8">
      <Suspense fallback={
        <div className="p-24 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground text-sm">Aggregating millions of throws...</p>
        </div>
      }>
        <StatisticsContent />
      </Suspense>
    </PageShell>
  );
}
