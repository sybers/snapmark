import { defineStore } from 'pinia';
import { readonly, ref, watch } from 'vue';

export const useCanvasStore = defineStore('canvas', () => {
  const canvasWidth = ref(1920);
  const canvasHeight = ref(1080);

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
  const scale = ref(0.65);

  function setScreenshot(file: File) {
    screenshotSrc.value = URL.createObjectURL(file);
  }

  function setRotation(value: number) {
    rotation.value = value;
  }

  function setScale(value: number) {
    scale.value = value;
  }

  function setAspectRatio(aspectRatio: number) {
    canvasHeight.value = Math.round(canvasWidth.value / aspectRatio);
  }

  return {
    canvasWidth,
    canvasHeight,
    screenshot: readonly(screenshot),
    rotation,
    scale,
    setAspectRatio,
    setScreenshot,
    setRotation,
    setScale,
  };
});
