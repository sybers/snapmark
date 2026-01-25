import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { Settings } from '../types';
import { DEFAULT_SETTINGS, loadSettings, saveSettings } from './settings.model';

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

  const settings = ref<Settings>(loadSettings());

  watch(
    settings,
    (newSettings) => {
      saveSettings(newSettings);
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
    settings.value = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
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
