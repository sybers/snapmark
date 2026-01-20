import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useSettingsStore } from '../stores/settings.store';

const screenshotBoxShadowOptions = [
  'none',
  'rgba(0, 0, 0, 0.1) 0px 0px 10px',
  'rgba(0, 0, 0, 0.2) 0px 10px 35px 0px',
  'rgba(0, 0, 0, 0.25) 0px 20px 40px 0px',
  'rgba(0, 0, 0, 0.3) 0px 25px 45px 0px',
  'rgba(0, 0, 0, 0.3) 0px 30px 50px 0px',
  'rgba(0, 0, 0, 0.34) 0px 35px 55px 0px',
  'rgba(0, 0, 0, 0.38) 0px 40px 60px 0px',
  'rgba(0, 0, 0, 0.38) 0px 45px 65px 0px',
  'rgba(0, 0, 0, 0.4) 0px 50px 70px 0px',
  'rgba(0, 0, 0, 0.5) 0px 55px 75px 0px',
];

export function useScreenshotSettings() {
  const settingsStore = useSettingsStore();
  const {
    settings,
    screenshotFile,
    screenshotDataURL,
    screenshot,
  } = storeToRefs(settingsStore);

  const { setScreenshotDataURL } = settingsStore;

  const screenshotRotation = computed({
    get: () => settings.value.screenshot.rotation,
    set: (value) => {
      settings.value.screenshot.rotation = value;
    },
  });

  const screenshotPerspective = computed({
    get: () => settings.value.screenshot.perspective,
    set: (value) => {
      settings.value.screenshot.perspective = value;
    },
  });

  const screenshotOffset = computed({
    get: () => settings.value.screenshot.offset,
    set: (value) => {
      settings.value.screenshot.offset = value;
    },
  });

  const screenshotScale = computed({
    get: () => settings.value.screenshot.scale,
    set: (value) => {
      settings.value.screenshot.scale = value;
    },
  });

  const screenshotRoundness = computed({
    get: () => settings.value.screenshot.roundness,
    set: (value) => {
      settings.value.screenshot.roundness = value;
    },
  });

  const screenshotBoxShadow = computed({
    get: () => settings.value.screenshot.boxShadow,
    set: (value) => {
      settings.value.screenshot.boxShadow = value;
    },
  });

  function resetScreenshot() {
    screenshotFile.value = null;
  }

  return {
    screenshotFile,
    screenshotDataURL,
    screenshot,
    screenshotRotation,
    screenshotPerspective,
    screenshotOffset,
    screenshotScale,
    screenshotRoundness,
    screenshotBoxShadow,
    screenshotBoxShadowOptions,
    setScreenshotDataURL,
    resetScreenshot,
  };
}
