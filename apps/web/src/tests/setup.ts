import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { vi, beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ── Canvas mock (jsdom has no canvas implementation) ──────────────────────────
const mockCtx: Partial<CanvasRenderingContext2D> & Record<string, unknown> = {
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  fillRect: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
  globalAlpha: 1,
};

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => mockCtx,
  writable: true,
});

// ── ResizeObserver mock (required by recharts ResponsiveContainer) ─────────────
global.ResizeObserver = class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
};

// ── matchMedia mock ────────────────────────────────────────────────────────────
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
