interface PaginationDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
  /** Active dot colour class. Defaults to `bg-foreground/60`. */
  activeColor?: string;
}

/**
 * Dot-style page indicator — active dot expands to a pill.
 * Used inside card-level paginators (round breakdown, zone breakdown).
 */
export function PaginationDots({
  total,
  current,
  onSelect,
  activeColor = 'bg-foreground/60',
}: PaginationDotsProps) {
  if (total <= 1) return null;

  return (
    <div className="flex justify-center gap-1.5 mt-4">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to page ${i + 1}`}
          className={`h-1.5 rounded-full transition-all ${
            i === current ? `w-6 ${activeColor}` : 'w-1.5 bg-border hover:bg-[#555]'
          }`}
        />
      ))}
    </div>
  );
}
