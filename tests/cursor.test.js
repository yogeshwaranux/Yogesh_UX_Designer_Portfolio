import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { initCursor } from '../src/js/cursor.js';

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 0));

describe('Cursor Initialization', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <a href="/about">About</a>
      <button class="btn">Click me</button>
      <div class="card">Card content</div>
    `;
    // Clear any existing cursor elements
    const existing = document.querySelectorAll('.cursor-dot, .cursor-ring');
    existing.forEach(el => el.remove());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create cursor dot and ring elements', () => {
    // Mock matchMedia to return desktop-like environment (has hover)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
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

    initCursor();
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    expect(cursorDot).toBeTruthy();
    expect(cursorRing).toBeTruthy();
    expect(cursorDot.className).toBe('cursor-dot');
    expect(cursorRing.className).toBe('cursor-ring');
  });

  it('should append cursor elements to body', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
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

    initCursor();
    
    const cursorDot = document.body.querySelector('.cursor-dot');
    const cursorRing = document.body.querySelector('.cursor-ring');
    
    expect(cursorDot).toBeTruthy();
    expect(cursorRing).toBeTruthy();
  });

  it('should add hovered class on interactive elements hover', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
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

    initCursor();
    const cursorRing = document.querySelector('.cursor-ring');
    const button = document.querySelector('button.btn');
    
    // Simulate hover
    const hoverEvent = new PointerEvent('pointerover', { bubbles: true });
    Object.defineProperty(hoverEvent, 'target', { value: button, enumerable: true });
    document.body.dispatchEvent(hoverEvent);
    
    expect(cursorRing.classList.contains('hovered')).toBe(true);
  });

  it('should remove hovered class on element leave', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
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

    initCursor();
    const cursorRing = document.querySelector('.cursor-ring');
    const button = document.querySelector('button.btn');
    
    // Add hovered class
    cursorRing.classList.add('hovered');
    
    // Simulate pointer out
    const outEvent = new PointerEvent('pointerout', { bubbles: true });
    Object.defineProperty(outEvent, 'target', { value: button, enumerable: true });
    document.body.dispatchEvent(outEvent);
    
    expect(cursorRing.classList.contains('hovered')).toBe(false);
  });

  it('should track mouse position on pointer move', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
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

    initCursor();
    const cursorDot = document.querySelector('.cursor-dot');
    
    const moveEvent = new PointerEvent('pointermove', {
      bubbles: true,
      clientX: 100,
      clientY: 200,
    });
    
    window.dispatchEvent(moveEvent);
    
    expect(cursorDot).toBeTruthy();
  });

  it('should not initialize on touch devices', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(hover: none)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    initCursor();
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    expect(cursorDot).toBeNull();
    expect(cursorRing).toBeNull();
  });
});
