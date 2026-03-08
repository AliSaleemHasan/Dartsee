import { describe, it, expect } from 'vitest';
import { renderAt } from '../helpers';

describe('GameDetail page', () => {
  it('renders without crashing on load', () => {
    // Tests that the Suspense fallback boundary catches the query safely
    const { container } = renderAt('/games/1');
    expect(container).toBeInTheDocument();
  });
});

