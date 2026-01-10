import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { useSettingsStore } from './settings.store';
import type { Settings } from '../types';

type Preset = {
  name: string;
  settings: Settings;
};

export const usePresetsStore = defineStore('presets', () => {
  const settingsStore = useSettingsStore();
  const presets = useLocalStorage<Preset[]>('presets', []);

  function loadPreset(name: string) {
    const preset = presets.value.find((p) => p.name === name);
    if (!preset) {
      throw new Error(`Preset ${name} not found`);
    }

    settingsStore.importSettings(preset.settings);
  }

  function savePreset(preset: Preset) {
    if (presets.value.find((p) => p.name === preset.name)) {
      throw new Error(`Preset ${preset.name} already exists`);
    }

    presets.value.push(preset);
  }

  function deletePreset(name: string) {
    presets.value = presets.value.filter((preset) => preset.name !== name);
  }

  return {
    presets,
    loadPreset,
    savePreset,
    deletePreset,
  };
});
