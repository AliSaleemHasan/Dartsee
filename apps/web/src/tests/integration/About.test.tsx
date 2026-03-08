import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderAt } from '../helpers';

describe('About page', () => {
  it('renders the page heading', () => {
    renderAt('/about');
    expect(screen.getByText('About Dartsee')).toBeInTheDocument();
  });

  it('renders the "Data Schema" section heading', () => {
    renderAt('/about');
    expect(screen.getByText('Data Schema')).toBeInTheDocument();
  });
});

