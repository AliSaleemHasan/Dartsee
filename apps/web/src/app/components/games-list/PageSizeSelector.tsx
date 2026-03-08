const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

interface PageSizeSelectorProps {
    pageSize: number;
    onPageSizeChange: (size: number) => void;
}

export function PageSizeSelector({ pageSize, onPageSizeChange }: PageSizeSelectorProps) {
    const pillActive = 'bg-[#2A2A2A] border-[#555] text-foreground';
    const pillIdle = 'bg-card border-border text-muted-foreground hover:border-[#444] hover:text-foreground';

    return (
        <div className="sm:ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <span>Rows:</span>
            {PAGE_SIZE_OPTIONS.map((s) => (
                <button
                    key={s}
                    onClick={() => onPageSizeChange(s)}
                    className={`h-7 w-9 rounded-md border text-sm transition-colors ${pageSize === s ? pillActive : pillIdle
                        }`}
                >
                    {s}
                </button>
            ))}
        </div>
    );
}
