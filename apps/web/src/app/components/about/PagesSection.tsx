import { Target, Layers, BarChart3 } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card, CardContent } from '../ui/card';

interface PageInfo {
  icon: ReactNode;
  name: string;
  path: string;
  description: string;
}

const PAGES: PageInfo[] = [
  {
    icon: <Layers className="w-4 h-4" />,
    name: 'Games',
    path: '/',
    description:
      'Backend: Provides a paginated endpoint retrieving games and their participating players via Prisma relations. Frontend: Renders a filterable, paginated table using React Query and localized atomic components.',
  },
  {
    icon: <Target className="w-4 h-4" />,
    name: 'Game Detail',
    path: '/games/:id',
    description:
      'Backend: Aggregates raw throw data to compute player stats (averages, misses, high scores) and chunks them by round. Frontend: Displays these statistics inside interactive, modular cards with inline error boundaries.',
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    name: 'Statistics',
    path: '/statistics',
    description:
      'Backend: Utilizes native database aggregations (groupBy) to generate platform-wide activity metrics. Frontend: Visualizes this data using Recharts (Pie/Bar charts) and robust layout grids.',
  },
  {
    icon: <Target className="w-4 h-4" />,
    name: 'Player Heatmap',
    path: '/heatmap/:gameId/:playerId',
    description:
      'Backend: Extracts and filters raw X/Y coordinate throw data for a specific player. Frontend: Plots these vectors on a dynamically scaled Canvas-based dartboard, applying colour-coding based on hit modifiers.',
  },

];

export function PagesSection() {
  return (
    <section>
      <h3 className="text-foreground mb-1">Pages</h3>
      <p className="text-muted-foreground text-sm mb-4">
        What each view shows and where the data comes from
      </p>

      <div className="space-y-3">
        {PAGES.map((p) => (
          <Card key={p.path}>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-md bg-[#2A2A2A] border border-border flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
                  {p.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-foreground text-sm">{p.name}</span>
                    <span className="text-xs font-mono text-muted-foreground border border-border bg-[#1a1a1a] px-1.5 py-0.5 rounded">
                      {p.path}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
