import React from 'react';
import { render, type RenderResult } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GamesList from '../app/pages/GamesList';
import GameDetail from '../app/pages/GameDetail';
import Statistics from '../app/pages/Statistics';
import About from '../app/pages/About';
import PlayerHeatmap from '../app/pages/PlayerHeatmap';


/** All application routes replicated for test memory router */
export const testRoutes = [
  { path: '/', Component: GamesList },
  { path: '/games/:gameId', Component: GameDetail },
  { path: '/statistics', Component: Statistics },
  { path: '/about', Component: About },
  { path: '/heatmap/:gameId/:playerId', Component: PlayerHeatmap },

];

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

/**
 * Render the full app at a given path using an in-memory router.
 * This lets Navigation's useLocation work and links resolve correctly.
 */
export function renderAt(path: string): RenderResult {
  const router = createMemoryRouter(testRoutes, { initialEntries: [path] });
  return render(
    <QueryClientProvider client={createTestQueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

/**
 * Render a standalone component with a basic router wrapper (no routes needed).
 */
export function renderWithRouter(
  ui: React.ReactElement,
  { initialPath = '/' }: { initialPath?: string } = {},
): RenderResult {
  const router = createMemoryRouter(
    [{ path: '*', element: ui }],
    { initialEntries: [initialPath] },
  );
  return render(
    <QueryClientProvider client={createTestQueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
