import { Link } from 'react-router';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

export interface Player {
  id: string;
  name: string;
}

export interface Game {
  id: number;
  type: string;
  players?: Player[];
  game_players?: { player: Player }[];
}

interface GamesTableProps {
  games: Game[];
}

/**
 * Card-wrapped table of games.
 * Shows an empty-state row when `games` is empty.
 */
export function GamesTable({ games }: GamesTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground w-24 pl-6">Game ID</TableHead>
              <TableHead className="text-muted-foreground w-28">Type</TableHead>
              <TableHead className="text-muted-foreground">Players</TableHead>
              <TableHead className="w-8 pr-6" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                  No games match your filters
                </TableCell>
              </TableRow>
            ) : (
              games.map((game) => <GameRow key={game.id} game={game} />)
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ── Private sub-component — not exported; only GamesTable needs it ─────────────
function GameRow({ game }: { game: Game }) {
  // Use game metadata directly from Nest API
  const playerList = game.players || game.game_players?.map((gp) => gp.player) || [];
  const href = `/games/${game.id}`;

  return (
    <TableRow className="border-border hover:bg-[#1a1a1a] transition-colors group cursor-pointer">
      <TableCell className="pl-6">
        <Link to={href} className="block w-full h-full">
          <span className="text-foreground tabular-nums">#{game.id}</span>
        </Link>
      </TableCell>
      <TableCell>
        <Link to={href} className="block w-full h-full">
          <Badge variant="outline" className="text-muted-foreground border-border font-normal">
            {game.type}
          </Badge>
        </Link>
      </TableCell>
      <TableCell>
        <Link to={href} className="block w-full h-full">
          <span className="text-foreground">{playerList.map((p) => p.name).join(' · ')}</span>
        </Link>
      </TableCell>
      <TableCell className="pr-6 text-right">
        <Link to={href} className="text-muted-foreground group-hover:text-foreground transition-colors">
          →
        </Link>
      </TableCell>
    </TableRow>
  );
}

