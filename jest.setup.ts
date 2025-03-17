import '@testing-library/jest-dom';

// Mock IntersectionObserver if needed
if (typeof window !== 'undefined') {
  window.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
  } as any;
}

// Suppress console errors/warnings in test output
global.console = {
  ...console,
  // Uncomment the following lines to suppress specific console methods during tests
  // error: jest.fn(),
  // warn: jest.fn(),
  // log: jest.fn(),
};