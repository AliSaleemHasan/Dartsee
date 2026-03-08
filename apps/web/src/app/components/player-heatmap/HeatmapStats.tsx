import { Crosshair, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { StatMiniCard } from '../shared/StatMiniCard';

interface HeatmapStatsProps {
  accuracy: string;
  avgScore: string;
  totalThrows: number;
}

/** Performance stats panel shown beside the dartboard heatmap. */
export function HeatmapStats({ accuracy, avgScore, totalThrows }: HeatmapStatsProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-foreground">Performance Stats</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <StatMiniCard icon={Crosshair} label="Accuracy" value={`${accuracy}%`} />
          <StatMiniCard icon={Target} label="Avg Score" value={avgScore} />
          <StatMiniCard icon={TrendingUp} label="Total Throws" value={totalThrows} />
        </div>
      </CardContent>
    </Card>
  );
}
