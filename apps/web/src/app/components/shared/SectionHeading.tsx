interface SectionHeadingProps {
  title: string;
  sub: string;
}

/** Section title + muted subtitle — shared across all chart cards. */
export function SectionHeading({ title, sub }: SectionHeadingProps) {
  return (
    <div>
      <h3 className="text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm mt-0.5">{sub}</p>
    </div>
  );
}
