import { useParams } from 'react-router';
import { Loader2 } from 'lucide-react';
import { useGameDetail } from '../lib/queries';
import { Suspense } from 'react';
import { PageShell } from '../components/shared/PageShell';
import { PlayerCard } from '../components/game-detail/PlayerCard';
import { GameDetailHeader } from '../components/game-detail/GameDetailHeader';

import { useEffect } from 'react';
import { toast } from 'sonner';

function GameDetailContent({ gameId }: { gameId: number }) {
  const { data: game, isError } = useGameDetail(gameId);

  useEffect(() => {
    if (isError) toast.error('Failed to load game data.');
  }, [isError]);

  if (isError || !game) {
    return (
      <>
        <GameDetailHeader gameId={gameId} gameType="Unknown" playerCount={0} />
        <div className="mt-8 py-24 flex items-center justify-center text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
          Failed to load game data, or the game does not exist.
        </div>
      </>
    );
  }

  const gamePlayers = game.players || [];

  return (
    <>
      <GameDetailHeader
        gameId={game.id}
        gameType={game.type}
        playerCount={gamePlayers.length}
      />

      <div className="space-y-6">
        {gamePlayers.map((playerData: any) => (
          <PlayerCard
            key={playerData.id}
            player={{ id: playerData.id, name: playerData.name }}
            gameId={game.id}
            isWinner={playerData.isWinner}
            stats={playerData.stats}
            rounds={playerData.rounds}
          />
        ))}
      </div>
    </>
  );
}

export default function GameDetail() {
  const { gameId } = useParams();
  const idNumber = Number(gameId);

  if (!gameId || isNaN(idNumber)) {
    return (
      <PageShell>
        <div className="text-center text-muted-foreground p-12">Invalid Game ID</div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Suspense fallback={
        <div className="p-24 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground text-sm">Loading match statistics...</p>
        </div>
      }>
        <GameDetailContent gameId={idNumber} />
      </Suspense>
    </PageShell>
  );
}
