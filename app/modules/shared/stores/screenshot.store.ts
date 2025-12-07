import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export interface ScreenshotStoreOptions {
  rotation: number;
  scale: number;
  roundness: number;
  boxShadow: string;
}

export const useScreenshotStore = defineStore('screenshot', () => {
  const screenshotSrc = ref<string | null>(null);
  const screenshot = ref<HTMLImageElement | null>(null);

  watch(screenshotSrc, () => {
    if (!screenshotSrc.value)
      return;

    const image = new Image();
    image.src = screenshotSrc.value;
    image.onload = () => {
      screenshot.value = image;
    };
    image.onerror = () => {
      screenshot.value = null;
    };
  }, { immediate: true });

  const rotation = ref(0);
  const scale = ref(65);
  const roundness = ref(0);
  const boxShadow = ref('rgba(0, 0, 0, 0.3) 0px 25px 45px 0px');

  function setScreenshot(file: File) {
    screenshotSrc.value = URL.createObjectURL(file);
  }

  function importValues(values: ScreenshotStoreOptions) {
    rotation.value = values.rotation;
    scale.value = values.scale;
    roundness.value = values.roundness;
    boxShadow.value = values.boxShadow;
  }

  function exportValues(): ScreenshotStoreOptions {
    return {
      rotation: rotation.value,
      scale: scale.value,
      roundness: roundness.value,
      boxShadow: boxShadow.value,
    };
  }

  return {
    screenshot,
    rotation,
    scale,
    roundness,
    boxShadow,
    setScreenshot,
    importValues,
    exportValues,
  };
});
