import { Link } from 'react-router';
import { Trophy, Target, XCircle, BarChart3, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { StatMiniCard } from '../shared/StatMiniCard';
import { RoundBreakdown } from './RoundBreakdown';

interface RoundData {
  roundNumber: number;
  throws: string[];
  score: number;
}

interface PlayerCardProps {
  player: { id: string; name: string };
  gameId: number;
  isWinner: boolean;
  stats: {
    averageScorePerRound: number;
    misses: number;
    totalScore: number;
    bestRoundScore: number;
  };
  rounds: RoundData[];
}

/**
 * Full per-player section shown on the Game Detail page.
 * Receives pre-computed stats from the Backend API.
 */
export function PlayerCard({
  player,
  gameId,
  isWinner,
  stats,
  rounds,
}: PlayerCardProps) {
  return (
    <Card className={isWinner ? 'border-[#444]' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Identity */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-[#2A2A2A] border border-border flex items-center justify-center">
              {isWinner ? (
                <Trophy className="w-5 h-5 text-foreground" />
              ) : (
                <Target className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex items-center gap-3">
              <h3 className="text-foreground">{player.name}</h3>
              {isWinner && (
                <Badge variant="outline" className="text-muted-foreground border-[#555]">
                  Winner
                </Badge>
              )}
            </div>
          </div>

          {/* Heatmap link */}
          <Button variant="outline" asChild className="text-muted-foreground hover:text-foreground gap-2">
            <Link to={`/heatmap/${gameId}/${player.id}`}>
              <MapPin className="w-4 h-4" />
              Heatmap
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Stats row — provided by backend aggregation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatMiniCard icon={BarChart3} label="Avg / Round" value={stats.averageScorePerRound.toFixed(1)} />
          <StatMiniCard icon={XCircle} label="Misses" value={stats.misses} />
          <StatMiniCard icon={Target} label="Total Score" value={stats.totalScore} />
          <StatMiniCard icon={Trophy} label="Best Round" value={stats.bestRoundScore} />
        </div>

        <Separator className="mb-6" />
        <RoundBreakdown roundsData={rounds} />
      </CardContent>
    </Card>
  );
}
