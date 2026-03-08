import { useState, useMemo, Suspense, useEffect } from 'react';
import { useGames, useStatisticsPopularity } from '../lib/queries';
import { PageShell } from '../components/shared/PageShell';
import { Pagination } from '../components/shared/Pagination';
import { GamesFilter } from '../components/games-list/GamesFilter';
import { GamesTable } from '../components/games-list/GamesTable';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_PAGE_SIZE = 20;

function GamesListContent() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { data, isLoading, isFetching, isError, error } = useGames(page, pageSize, selectedType);
  const { data: popularity } = useStatisticsPopularity();

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load games data from the server.');
    }
  }, [isError, error]);

  const games = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 20, totalPages: 1 };

  const filteredGames = useMemo(() => {
    const q = search.trim().toLowerCase();
    return games.filter((game: any) => {
      const matchesSearch =
        q === '' || String(game.id).includes(q) || game.type.toLowerCase().includes(q);
      return matchesSearch;
    });
  }, [games, search]);

  const gameTypes = useMemo(() => {
    const types = Array.from(new Set(popularity.map((p: any) => p.gametype))).sort() as string[];
    return ['All', ...types];
  }, [popularity]);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleType = (t: string) => { setSelectedType(t); setPage(1); };
  const handlePageSize = (s: number) => { setPageSize(s); setPage(1); };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-foreground mb-1">Games</h2>
        <p className="text-muted-foreground text-sm">
          {meta.total} total games tracked
        </p>
      </div>

      <GamesFilter
        search={search}
        onSearch={handleSearch}
        gameTypes={gameTypes}
        selectedType={selectedType}
        onTypeChange={handleType}
        pageSize={pageSize}
        onPageSizeChange={handlePageSize}
      />

      {isLoading ? (
        <div className="py-24 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="py-24 flex items-center justify-center text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
          Failed to load games data. Please refresh.
        </div>
      ) : (
        <div className={`transition-opacity duration-200 ${isFetching ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <GamesTable games={filteredGames} />
        </div>
      )}

      {filteredGames.length > 0 && !isLoading && (
        <p className="text-center text-xs text-muted-foreground mt-4">
          Showing page {meta.page} of {meta.totalPages} from {meta.total} games
        </p>
      )}

      <Pagination page={meta.page} totalPages={meta.totalPages} onPage={setPage} />
    </>
  );
}

export default function GamesList() {
  return (
    <PageShell>
      <Suspense fallback={<div className="p-12 text-center animate-pulse"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></div>}>
        <GamesListContent />
      </Suspense>
    </PageShell>
  );
}
