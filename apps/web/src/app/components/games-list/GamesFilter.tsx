import { GamesSearchInput } from './GamesSearchInput';
import { GameTypeFilter } from './GameTypeFilter';
import { PageSizeSelector } from './PageSizeSelector';

interface GamesFilterProps {
  search: string;
  onSearch: (value: string) => void;
  gameTypes: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

/**
 * Composed search input + type-filter pills + rows-per-page picker.
 * Adheres to SOLID Single Responsibility (composition over monolithic rendering).
 * Fully controlled — all state lives in the parent page/hook.
 */
export function GamesFilter({
  search,
  onSearch,
  gameTypes,
  selectedType,
  onTypeChange,
  pageSize,
  onPageSizeChange,
}: GamesFilterProps) {
  return (
    <div className="mb-5 flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1 w-full">
        <GamesSearchInput search={search} onSearch={onSearch} />
        <GameTypeFilter
          gameTypes={gameTypes}
          selectedType={selectedType}
          onTypeChange={onTypeChange}
        />
      </div>
      <PageSizeSelector
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}

