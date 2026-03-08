import { describe, it, expect } from 'vitest';
import { renderAt } from '../helpers';

describe('Statistics page', () => {
  it('renders without crashing on load', () => {
    const { container } = renderAt('/statistics');
    expect(container).toBeInTheDocument();
  });
});

