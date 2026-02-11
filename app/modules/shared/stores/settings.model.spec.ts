import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { DEFAULT_SETTINGS, loadSettings, saveSettings } from './settings.model';
import type { Settings } from '../types';

class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  constructor(initial: Record<string, string> = {}) {
    Object.entries(initial).forEach(([k, v]) => this.store.set(k, v));
  }

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) ?? null) : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}

describe('settings.model', () => {
  describe('loadSettings', () => {
    const storageKey = 'test-settings-key';

    let warnSpy: ReturnType<typeof vi.spyOn>;
    let errorSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      warnSpy.mockRestore();
      errorSpy.mockRestore();
    });

    test('returns defaults when storage is empty', () => {
      const storage = new MemoryStorage();

      const result = loadSettings({ storage, storageKey });

      expect(result).toEqual(DEFAULT_SETTINGS);
      expect(storage.getItem(storageKey)).toBeNull();
      expect(warnSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
    });

    test('returns stored settings when they are valid', () => {
      const storedSettings: Settings = {
        canvas: {
          canvasWidth: 1337,
          canvasHeight: 900,
        },
        frame: {
          frameName: 'windows',
        },
        background: {
          backgroundStyle: {
            type: 'solid',
            color: '#123456',
          },
          opacity: 42,
          roundness: 12,
          noiseOpacity: 35,
        },
        screenshot: {
          rotation: 10,
          scale: 80,
          roundness: 7,
          perspective: { x: 4, y: -3 },
          offset: { x: 15, y: -20 },
          boxShadow: 'rgba(10, 20, 30, 0.5) 1px 2px 3px 4px',
        },
      };

      const storage = new MemoryStorage({
        [storageKey]: JSON.stringify(storedSettings),
      });

      const result = loadSettings({ storage, storageKey });

      expect(result).toEqual(storedSettings);
      expect(warnSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
    });

    test('when stored settings contain unknown fields, ignores them while loading the rest', () => {
      const storedSettings: Settings = {
        canvas: {
          canvasWidth: 1337,
          canvasHeight: 900,
        },
        frame: {
          frameName: 'windows',
        },
        background: {
          backgroundStyle: {
            type: 'solid',
            color: '#123456',
          },
          opacity: 42,
          roundness: 12,
          noiseOpacity: 35,
        },
        screenshot: {
          rotation: 10,
          scale: 80,
          roundness: 7,
          perspective: { x: 4, y: -3 },
          offset: { x: 15, y: -20 },
          boxShadow: 'rgba(10, 20, 30, 0.5) 1px 2px 3px 4px',
        },
      };

      const storedWithUnknownFields = {
        ...storedSettings,
        extraRoot: 'ignored',
        canvas: {
          ...storedSettings.canvas,
          extraCanvas: 123,
        },
        background: {
          ...storedSettings.background,
          extraBackground: true,
          backgroundStyle: {
            ...storedSettings.background.backgroundStyle,
            extraStyle: 'ignored-too',
          },
        },
      };

      const storage = new MemoryStorage({
        [storageKey]: JSON.stringify(storedWithUnknownFields),
      });

      const result = loadSettings({ storage, storageKey });

      expect(result).toEqual(storedSettings);
      expect(warnSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
    });

    test('when stored settings are incomplete, deep merges them with defaults', () => {
      const storedPartial = {
        canvas: {
          canvasWidth: 800,
        },
        background: {
          noiseOpacity: 22,
        },
      };

      const storage = new MemoryStorage({
        [storageKey]: JSON.stringify(storedPartial),
      });

      const result = loadSettings({ storage, storageKey });

      expect(result).toEqual({
        ...DEFAULT_SETTINGS,
        canvas: {
          ...DEFAULT_SETTINGS.canvas,
          canvasWidth: 800,
        },
        background: {
          ...DEFAULT_SETTINGS.background,
          noiseOpacity: 22,
        },
      });
      expect(warnSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
    });

    test('when stored settings are invalid, clears them and returns defaults', () => {
      const storage = new MemoryStorage({
        [storageKey]: JSON.stringify({
          ...DEFAULT_SETTINGS,
          canvas: {
            // invalid type; should fail schema even after deep merge
            canvasWidth: 'nope',
          },
        }),
      });

      const result = loadSettings({ storage, storageKey });

      expect(result).toEqual(DEFAULT_SETTINGS);
      expect(storage.getItem(storageKey)).toBeNull();
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).not.toHaveBeenCalled();
    });

    test('when stored settings are invalid JSON, clears them and returns defaults', () => {
      const storage = new MemoryStorage({
        [storageKey]: '{not-json}',
      });

      const result = loadSettings({ storage, storageKey });

      expect(result).toEqual(DEFAULT_SETTINGS);
      expect(storage.getItem(storageKey)).toBeNull();
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    test('when provided with a different storageKey, uses it', () => {
      const otherKey = 'other-key';
      const storage = new MemoryStorage({
        [otherKey]: JSON.stringify(DEFAULT_SETTINGS),
      });

      const result = loadSettings({ storage, storageKey });

      expect(result).toEqual(DEFAULT_SETTINGS);
      expect(storage.getItem(otherKey)).toEqual(JSON.stringify(DEFAULT_SETTINGS));
    });
  });

  describe('saveSettings', () => {
    const storageKey = 'test-settings-key';

    let errorSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      errorSpy.mockRestore();
    });

    test('persists settings as JSON in storage', () => {
      const storage = new MemoryStorage();

      saveSettings(DEFAULT_SETTINGS, { storage, storageKey });

      expect(storage.getItem(storageKey)).toEqual(JSON.stringify(DEFAULT_SETTINGS));
      expect(errorSpy).not.toHaveBeenCalled();
    });

    test('does not throw if storage.setItem fails', () => {
      const storage = new MemoryStorage();
      const setItemSpy = vi.spyOn(storage, 'setItem').mockImplementation(() => {
        throw new Error('disk full');
      });

      expect(() => saveSettings(DEFAULT_SETTINGS, { storage, storageKey })).not.toThrow();
      expect(errorSpy).toHaveBeenCalledTimes(1);

      setItemSpy.mockRestore();
    });

    test('uses the provided storageKey', () => {
      const otherKey = 'other-key';
      const storage = new MemoryStorage();

      saveSettings(DEFAULT_SETTINGS, { storage, storageKey: otherKey });

      expect(storage.getItem(otherKey)).toEqual(JSON.stringify(DEFAULT_SETTINGS));
      expect(storage.getItem(storageKey)).toBeNull();
    });
  });
});
