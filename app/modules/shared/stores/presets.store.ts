import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { useScreenshotStore, type ScreenshotStoreOptions } from './screenshot.store';
import { useCanvasStore, type CanvasStoreOptions } from './canvas.store';
import { useBackgroundStore, type BackgroundStoreOptions } from './background.store';
import { useFrameStore, type FrameStoreOptions } from './frame.store';

type Preset = {
  name: string;
  canvas: CanvasStoreOptions;
  frame: FrameStoreOptions;
  background: BackgroundStoreOptions;
  screenshot: ScreenshotStoreOptions;
};

const defaultPreset: Preset = {
  name: 'Default',
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
    roundness: 32,
    noise: true,
  },
  screenshot: {
    rotation: 0,
    scale: 75,
    roundness: 32,
    perspective: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 25px 45px 0px',
  },
};

export const usePresetsStore = defineStore('presets', () => {
  const screenshotStore = useScreenshotStore();
  const frameStore = useFrameStore();
  const canvasStore = useCanvasStore();
  const backgroundStore = useBackgroundStore();

  const savedPresets = useLocalStorage<Preset[]>('presets', []);

  function loadDefaultPreset() {
    const savedDefaultPreset = savedPresets.value.find((preset) => preset.name === 'Default');
    if (savedDefaultPreset) {
      loadPreset(savedDefaultPreset);
    } else {
      loadPreset(defaultPreset);
    }
  };

  function loadPreset(preset: Preset) {
    canvasStore.importValues(preset.canvas);
    frameStore.importValues(preset.frame);
    backgroundStore.importValues(preset.background);
    screenshotStore.importValues(preset.screenshot);
  }

  function savePreset(preset: Preset) {
    savedPresets.value.push(preset);
  }

  function saveStateAsPreset(name: string) {
    if (savedPresets.value.find((preset) => preset.name === name)) {
      deletePreset(name);
    }

    savePreset({
      name,
      canvas: canvasStore.exportValues(),
      frame: frameStore.exportValues(),
      background: backgroundStore.exportValues(),
      screenshot: screenshotStore.exportValues(),
    });
  }

  function deletePreset(name: string) {
    savedPresets.value = savedPresets.value.filter((preset) => preset.name !== name);
  }

  function handleStoreUpdate() {
    saveStateAsPreset('Default');
  }

  screenshotStore.$subscribe(handleStoreUpdate);
  frameStore.$subscribe(handleStoreUpdate);
  canvasStore.$subscribe(handleStoreUpdate);
  backgroundStore.$subscribe(handleStoreUpdate);

  return {
    loadDefaultPreset,
    loadPreset,
    saveStateAsPreset,
    deletePreset,
  };
});
