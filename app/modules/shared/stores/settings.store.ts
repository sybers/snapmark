import * as v from 'valibot';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { Settings } from '../types';
import { SettingsSchema } from '../schemas';

export const defaultSettings: Settings = {
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

const STORAGE_KEY = 'snapmark-settings';

function loadFromLocalStorage(): Settings {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultSettings;
    }

    const parsed = JSON.parse(stored);
    const result = v.safeParse(SettingsSchema, parsed);

    if (result.success) {
      return result.output;
    } else {
      console.warn('Invalid settings in localStorage, using defaults:', result.issues);
      localStorage.removeItem(STORAGE_KEY);
      return defaultSettings;
    }
  } catch (error) {
    console.error('Error loading settings from localStorage:', error);
    localStorage.removeItem(STORAGE_KEY);
    return defaultSettings;
  }
}

function saveToLocalStorage(settings: Settings): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings to localStorage:', error);
  }
}

export const useSettingsStore = defineStore('settings', () => {
  const screenshotFile = ref<File | null>(null);
  const screenshot = ref<HTMLImageElement | null>(null);

  const screenshotDataURL = computed<string | null>(() => {
    if (!screenshotFile.value)
      return null;

    return URL.createObjectURL(screenshotFile.value);
  });

  function setScreenshotDataURL(dataURL: string) {
    const image = new Image();
    image.src = dataURL;
    image.onload = () => {
      screenshot.value = image;
    };
    image.onerror = () => {
      screenshot.value = null;
    };
  }

  watch(
    screenshotFile,
    () => {
      if (!screenshotDataURL.value)
        return;

      setScreenshotDataURL(screenshotDataURL.value);
    },
    { immediate: true },
  );

  const settings = ref<Settings>(loadFromLocalStorage());

  watch(
    settings,
    (newSettings) => {
      saveToLocalStorage(newSettings);
    },
    { deep: true },
  );

  function importSettings(newSettings: Settings) {
    settings.value = JSON.parse(JSON.stringify(newSettings));
  }

  function exportSettings(): Settings {
    return JSON.parse(JSON.stringify(settings.value));
  }

  function resetToDefaults() {
    settings.value = JSON.parse(JSON.stringify(defaultSettings));
  }

  return {
    screenshotFile,
    screenshotDataURL,
    screenshot,
    settings,
    setScreenshotDataURL,
    importSettings,
    exportSettings,
    resetToDefaults,
  };
});
