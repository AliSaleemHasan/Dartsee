import { Link, useParams } from 'react-router';
import { Suspense } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { usePlayerHeatmap } from '../lib/queries';
import { PageShell } from '../components/shared/PageShell';
import { DartboardHeatmap } from '../components/DartboardHeatmap';
import { HeatmapStats } from '../components/player-heatmap/HeatmapStats';
import { FavoriteZones } from '../components/player-heatmap/FavoriteZones';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';

import { useEffect } from 'react';
import { toast } from 'sonner';

function PlayerHeatmapContent() {
  const { gameId, playerId } = useParams();

  const { data: heatmapData, isError } = usePlayerHeatmap(playerId || '');

  useEffect(() => {
    if (isError) toast.error(`Failed to load heatmap data for player ${playerId}`);
  }, [isError, playerId]);

  if (isError || !heatmapData) {
    return (
      <>
        <Button
          variant="ghost"
          asChild
          className="mb-6 pl-0 text-muted-foreground hover:text-[#39FF14] hover:bg-transparent gap-2"
        >
          <Link to={`/games/${gameId}`}>
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Link>
        </Button>
        <div className="py-24 flex items-center justify-center text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
          Failed to load heatmap data for player {playerId}
        </div>
      </>
    );
  }

  const { performance, favoriteZones, coordinates } = heatmapData;

  return (
    <>
      <Button
        variant="ghost"
        asChild
        className="mb-6 pl-0 text-muted-foreground hover:text-[#39FF14] hover:bg-transparent gap-2"
      >
        <Link to={`/games/${gameId}`}>
          <ArrowLeft className="w-4 h-4" />
          Back to Game
        </Link>
      </Button>

      <div className="mb-8">
        <h2 className="text-foreground mb-1">Player Profile Heatmap</h2>
        <p className="text-muted-foreground">
          Visual representation of all recorded throws by this player
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dartboard */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-foreground">Dartboard Heatmap</h3>
            <HeatmapLegend />
          </CardHeader>
          <CardContent>
            <DartboardHeatmap throws={coordinates} />
          </CardContent>
        </Card>

        {/* Stats + Zones */}
        <div className="space-y-4">
          <HeatmapStats
            accuracy={performance.accuracy.toFixed(1)}
            avgScore={performance.averageScore.toFixed(1)}
            totalThrows={performance.totalThrows}
          />
          <FavoriteZones favoriteZones={favoriteZones} />
        </div>
      </div>
    </>
  );
}

export default function PlayerHeatmap() {
  return (
    <PageShell>
      <Suspense fallback={
        <div className="p-24 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground text-sm">Rendering heatmap points...</p>
        </div>
      }>
        <PlayerHeatmapContent />
      </Suspense>
    </PageShell>
  );
}

// ── Private legend — only needed on this page ─────────────────────────────────
function HeatmapLegend() {
  const items = [
    { label: 'Triple', color: '#39FF14' },
    { label: 'Double', color: '#FFD93D' },
    { label: 'Single', color: '#FFFFFF' },
    { label: 'Miss', color: '#FF6B6B' },
  ];
  return (
    <div className="flex gap-4 text-sm text-muted-foreground">
      {items.map(({ label, color }) => (
        <div key={label} className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
