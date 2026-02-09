import * as v from 'valibot';
import deepmerge from 'deepmerge';
import type { Settings } from '../types';
import { SettingsSchema } from '../schemas';

export const DEFAULT_SETTINGS: Settings = {
  canvas: {
    canvasWidth: 1200,
    canvasHeight: 1200,
  },
  frame: {
    frameName: 'arc',
  },
  background: {
    backgroundStyle: {
      type: 'gradient',
      rotation: 45,
      stops: [
        { color: '#fada61', position: '0.000%' },
        { color: '#ff9188', position: '50.000%' },
        { color: '#ff5acd', position: '100.000%' },
      ],
    },
    opacity: 100,
    roundness: 0,
    noise: true,
    noiseOpacity: 35,
  },
  screenshot: {
    rotation: 0,
    scale: 65,
    roundness: 0,
    perspective: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 25px 45px 0px',
  },
};

export const SETTINGS_STORAGE_KEY = 'snapmark-settings';

export function loadSettings({
  storageKey = SETTINGS_STORAGE_KEY,
  storage = localStorage,
}: {
  storageKey?: string;
  storage?: Storage;
} = {}): Settings {
  try {
    const stored = storage.getItem(storageKey);
    if (!stored) {
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(stored);
    const merged = deepmerge(DEFAULT_SETTINGS, parsed, {
      arrayMerge: (_destinationArray, sourceArray) => sourceArray,
    });
    const result = v.safeParse(SettingsSchema, merged);

    if (result.success) {
      return result.output;
    } else {
      console.warn('Invalid settings in localStorage, using defaults:', result.issues);
      storage.removeItem(storageKey);
      return DEFAULT_SETTINGS;
    }
  } catch (error) {
    console.error('Error loading settings from localStorage:', error);
    storage.removeItem(storageKey);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Settings, {
  storageKey = SETTINGS_STORAGE_KEY,
  storage = localStorage,
}: {
  storageKey?: string;
  storage?: Storage;
} = {}): void {
  try {
    storage.setItem(storageKey, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings to localStorage:', error);
  }
}
