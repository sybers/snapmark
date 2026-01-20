import * as v from 'valibot';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';
import { useSettingsStore } from './settings.store';
import { SettingsSchema } from '../schemas';
import type { Settings } from '../types';

type Preset = {
  name: string;
  settings: Settings;
};

export const usePresetsStore = defineStore('presets', () => {
  const settingsStore = useSettingsStore();
  const rawPresets = useLocalStorage<Preset[]>('presets', []);

  const presets = computed({
    get() {
      const validPresets = rawPresets.value.filter((preset) => {
        const result = v.safeParse(SettingsSchema, preset.settings);
        return result.success;
      });

      if (validPresets.length !== rawPresets.value.length) {
        console.warn(
          `Removed ${rawPresets.value.length - validPresets.length} invalid preset(s) from storage`,
        );
        rawPresets.value = validPresets;
      }

      return validPresets;
    },
    set(value: Preset[]) {
      rawPresets.value = value;
    },
  });

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

    rawPresets.value.unshift(preset);
  }

  function deletePreset(name: string) {
    rawPresets.value = rawPresets.value.filter((preset) => preset.name !== name);
  }

  return {
    presets,
    loadPreset,
    savePreset,
    deletePreset,
  };
});
