import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderAt } from '../helpers';

describe('Navigation component', () => {
  it('renders the three nav items', () => {
    renderAt('/');
    expect(screen.getByRole('link', { name: /games/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /statistics/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('does not render removed pages (Dashboard, Clutch)', async () => {
    renderAt('/');
    await screen.findByRole('link', { name: /games/i });
    expect(screen.queryByRole('link', { name: /dashboard/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /clutch/i })).not.toBeInTheDocument();
  });

  it('Games link points to /', async () => {
    renderAt('/');
    const gamesLinks = await screen.findAllByRole('link', { name: /games/i });
    // At least one should have href="/"
    const rootLink = gamesLinks.find((el: HTMLElement) => el.getAttribute('href') === '/');
    expect(rootLink).toBeDefined();
  });

  it('Statistics link points to /statistics', async () => {
    renderAt('/statistics');
    const link = await screen.findByRole('link', { name: /statistics/i });
    expect(link).toHaveAttribute('href', '/statistics');
  });

  it('About link points to /about', async () => {
    renderAt('/about');
    const link = await screen.findByRole('link', { name: /about/i });
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders the Dartsee brand in the header', async () => {
    renderAt('/');
    expect(await screen.findByText('Dartsee')).toBeInTheDocument();
  });
});
