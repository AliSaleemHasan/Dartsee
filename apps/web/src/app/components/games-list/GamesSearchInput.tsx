import { Search, X } from 'lucide-react';

interface GamesSearchInputProps {
    search: string;
    onSearch: (value: string) => void;
}

export function GamesSearchInput({ search, onSearch }: GamesSearchInputProps) {
    return (
        <div className="relative w-full sm:w-80 md:w-96 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <input
                type="text"
                placeholder="Search by game ID or type…"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-card border border-border rounded-lg pl-9 pr-8 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#555] transition-colors"
            />
            {search && (
                <button
                    onClick={() => onSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );
}
