import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const boxShadowOptions = [
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

  function setScreenshot(file: File) {
    screenshotSrc.value = URL.createObjectURL(file);
  }

  const selectedBoxShadowIndex = ref(0);
  const boxShadow = computed(() => {
    return boxShadowOptions[selectedBoxShadowIndex.value];
  });

  return {
    screenshot,
    rotation,
    scale,
    roundness,
    selectedBoxShadowIndex,
    boxShadow,
    boxShadowOptions,
    setScreenshot,
  };
});
