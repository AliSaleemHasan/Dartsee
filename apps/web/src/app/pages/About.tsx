import { Info } from 'lucide-react';
import { PageShell } from '../components/shared/PageShell';
import { SchemaSection } from '../components/about/SchemaSection';
import { PagesSection } from '../components/about/PagesSection';
import { Card, CardContent } from '../components/ui/card';

export default function About() {
  return (
    <PageShell className="px-4 py-6 sm:px-8 sm:py-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="mb-8 flex items-center gap-3">
        <Info className="w-6 h-6 text-muted-foreground" />
        <div>
          <h2 className="text-foreground">About Dartsee</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Data schema, pages, and how everything connects
          </p>
        </div>
      </div>

      {/* Intro */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <p className="text-foreground leading-relaxed">
            Dartsee is a full-stack advanced darts analytics platform. The backend is powered by <strong>NestJS</strong> and uses <strong>Prisma</strong> to efficiently query and aggregate high-volume relational data (games, players, and throws) stored in a localized SQLite database. The frontend is a responsive <strong>React</strong> application utilizing <strong>TanStack Query</strong> for resilient data fetching, caching, and state management, alongside <strong>Recharts</strong> and HTML5 Canvas for dynamic performance visualizations.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <SchemaSection />
        <PagesSection />
      </div>
    </PageShell>
  );
}
