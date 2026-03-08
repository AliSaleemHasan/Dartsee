import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationDots } from '../shared/PaginationDots';

interface RoundData {
  roundNumber: number;
  throws: string[];
  score: number;
}

interface RoundBreakdownProps {
  roundsData: RoundData[];
}

const ROUNDS_PER_PAGE = 9;

/**
 * Paginated 3×3 grid of per-round throw breakdowns.
 * Manages its own page state — callers pass API pre-chunked `roundsData`.
 */
export function RoundBreakdown({ roundsData }: RoundBreakdownProps) {
  const [page, setPage] = useState(0);
  const totalRounds = roundsData.length;
  const totalPages = Math.ceil(totalRounds / ROUNDS_PER_PAGE);

  if (totalRounds === 0) {
    return <p className="text-sm text-muted-foreground">No round data available.</p>;
  }

  const startRound = page * ROUNDS_PER_PAGE;
  const endRound = Math.min(startRound + ROUNDS_PER_PAGE, totalRounds);
  const pageRounds = roundsData.slice(startRound, endRound);

  const navBtn =
    'w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:border-[#555] hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors';

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-foreground">Round Breakdown</h4>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Rounds {startRound + 1}–{endRound} of {totalRounds}
            </span>
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className={navBtn}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-foreground min-w-[40px] text-center">
              {page + 1} / {totalPages}
            </span>
            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              className={navBtn}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {pageRounds.map((round, index) => (
          <div key={index} className="p-3 bg-[#1a1a1a] rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Round {round.roundNumber}</span>
              <span className="text-sm text-foreground tabular-nums">{round.score}</span>
            </div>
            <div className="flex gap-2 text-sm">
              {round.throws.map((t, ti) => (
                <span
                  key={ti}
                  className={t === 'Miss' ? 'text-muted-foreground line-through' : 'text-foreground'}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <PaginationDots total={totalPages} current={page} onSelect={setPage} />
    </div>
  );
}
