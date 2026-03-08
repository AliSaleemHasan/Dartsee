import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';

export interface SchemaField {
  name: string;
  type: string;
  note?: string;
}

export interface SchemaTable {
  table: string;
  description: string;
  fields: SchemaField[];
}

export const SCHEMA: SchemaTable[] = [
  {
    table: 'games',
    description: 'One row per game session.',
    fields: [
      { name: 'id', type: 'integer', note: 'primary key' },
      { name: 'type', type: 'text', note: '501 · 301 · Cricket · 701' },
    ],
  },
  {
    table: 'players',
    description: 'Registered players across all games.',
    fields: [
      { name: 'id', type: 'text', note: 'primary key' },
      { name: 'name', type: 'text' },
    ],
  },
  {
    table: 'game_players',
    description: 'Links players to the games they participated in.',
    fields: [
      { name: 'id', type: 'text', note: 'primary key' },
      { name: 'game_id', type: 'integer', note: 'references games' },
      { name: 'player_id', type: 'text', note: 'references players' },
    ],
  },
  {
    table: 'throws',
    description: 'Every individual dart throw, with score and board position.',
    fields: [
      { name: 'id', type: 'integer', note: 'primary key' },
      { name: 'game_id', type: 'integer', note: 'references games' },
      { name: 'player_id', type: 'text', note: 'references players' },
      { name: 'score', type: 'integer', note: 'points scored (0 = miss)' },
      { name: 'modifier', type: 'integer', note: '0 miss · 1 single · 2 double · 3 triple' },
      { name: 'x', type: 'integer', note: '0 – 800 board coordinate' },
      { name: 'y', type: 'integer', note: '0 – 800 board coordinate' },
    ],
  },
];

/** Four schema-table cards showing field names, types and notes. */
export function SchemaSection() {
  return (
    <section>
      <h3 className="text-foreground mb-1">Data Schema</h3>
      <p className="text-muted-foreground text-sm mb-4">The four tables and their fields</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCHEMA.map((t) => (
          <Card key={t.table}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-foreground border border-border bg-[#2A2A2A] px-2 py-1 rounded">
                  {t.table}
                </span>
              </div>
              <p className="text-muted-foreground text-xs mt-1">{t.description}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <Separator className="mb-3" />
              <div className="space-y-2">
                {t.fields.map((f) => (
                  <div key={f.name} className="flex items-start justify-between gap-4">
                    <span className="text-xs font-mono text-foreground">{f.name}</span>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground font-mono">{f.type}</span>
                      {f.note && (
                        <p className="text-xs text-muted-foreground/60 mt-0.5">{f.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
