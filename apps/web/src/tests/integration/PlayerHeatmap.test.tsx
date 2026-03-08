import { describe, it, expect } from 'vitest';
import { renderAt } from '../helpers';

describe('PlayerHeatmap page', () => {
  it('renders without crashing on load', () => {
    const { container } = renderAt('/heatmap/1/p2');
    expect(container).toBeInTheDocument();
  });
});

