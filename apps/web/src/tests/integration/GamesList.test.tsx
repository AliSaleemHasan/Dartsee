import { describe, it, expect } from 'vitest';
import { renderAt } from '../helpers';

describe('GamesList page', () => {
  it('renders without crashing on load', () => {
    const { container } = renderAt('/');
    expect(container).toBeInTheDocument();
  });
});

