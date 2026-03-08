import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface FavoriteZonesProps {
  favoriteZones: {
    score: number;
    hits: number;
    percentage: number;
  }[];
}

/** Ordered list of the player's most-targeted dartboard segments. */
export function FavoriteZones({ favoriteZones }: FavoriteZonesProps) {
  if (!favoriteZones || favoriteZones.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-foreground">Favorite Zones</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {favoriteZones.map((zone, index) => {
            return (
              <div key={zone.score}>
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${index === 0
                          ? 'bg-[#39FF14]/10 border border-[#39FF14] text-[#39FF14]'
                          : 'bg-[#2A2A2A] border border-border text-foreground'
                        }`}
                    >
                      {zone.score}
                    </div>
                    <span className="text-foreground">{zone.hits} hits</span>
                  </div>
                  <Badge variant="outline">{zone.percentage}%</Badge>
                </div>
                {index < favoriteZones.length - 1 && <Separator className="mt-2" />}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
