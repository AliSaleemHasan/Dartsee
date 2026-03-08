import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
}

/**
 * Full arrow + numbered pagination bar.
 * Renders nothing when `totalPages <= 1`.
 */
export function Pagination({ page, totalPages, onPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageList(page, totalPages);

  const base =
    'h-8 min-w-[32px] px-2 rounded-md border text-sm transition-colors flex items-center justify-center';
  const idle =
    'bg-card border-border text-muted-foreground hover:border-[#555] hover:text-foreground';
  const active = 'bg-[#2A2A2A] border-[#555] text-foreground';
  const disabled = 'opacity-30 cursor-not-allowed pointer-events-none';

  return (
    <div className="flex items-center justify-center gap-1.5 pt-5">
      <button
        onClick={() => onPage(1)}
        disabled={page === 1}
        aria-label="First"
        className={`${base} ${idle} ${page === 1 ? disabled : ''}`}
      >
        <ChevronsLeft className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        aria-label="Prev"
        className={`${base} ${idle} ${page === 1 ? disabled : ''}`}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="text-muted-foreground px-1 select-none text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPage(p as number)}
            aria-current={p === page ? 'page' : undefined}
            className={`${base} ${p === page ? active : idle}`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        aria-label="Next"
        className={`${base} ${idle} ${page === totalPages ? disabled : ''}`}
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => onPage(totalPages)}
        disabled={page === totalPages}
        aria-label="Last"
        className={`${base} ${idle} ${page === totalPages ? disabled : ''}`}
      >
        <ChevronsRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function buildPageList(page: number, totalPages: number): (number | '…')[] {
  const delta = 2;
  const range: number[] = [];
  for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
    range.push(i);
  }
  const result: (number | '…')[] = [];
  if (range[0] > 1) {
    result.push(1);
    if (range[0] > 2) result.push('…');
  }
  result.push(...range);
  if (range[range.length - 1] < totalPages) {
    if (range[range.length - 1] < totalPages - 1) result.push('…');
    result.push(totalPages);
  }
  return result;
}
