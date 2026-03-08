interface GameTypeFilterProps {
    gameTypes: string[];
    selectedType: string;
    onTypeChange: (type: string) => void;
}

export function GameTypeFilter({ gameTypes, selectedType, onTypeChange }: GameTypeFilterProps) {
    const pillBase = 'px-3 py-1.5 rounded-md text-sm border transition-colors whitespace-nowrap';
    const pillActive = 'bg-[#2A2A2A] border-[#555] text-foreground';
    const pillIdle = 'bg-card border-border text-muted-foreground hover:border-[#444] hover:text-foreground';

    return (
        <div className="flex gap-1.5 flex-wrap items-center flex-1">
            {gameTypes.map((type) => (
                <button
                    key={type}
                    onClick={() => onTypeChange(type)}
                    className={`${pillBase} ${selectedType === type ? pillActive : pillIdle}`}
                >
                    {type}
                </button>
            ))}
        </div>
    );
}
