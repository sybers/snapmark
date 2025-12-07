import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface BackgroundStoreOptions {
  backgroundStyle: string;
  opacity: number;
  roundness: number;
  noise: boolean;
}

export const useBackgroundStore = defineStore('background', () => {
  const backgroundStyle = ref('linear-gradient(45deg, #fada61 0.000%, #ff9188 50.000%, #ff5acd 100.000%)');
  const roundness = ref(0);
  const opacity = ref(100);
  const noise = ref(true);

  const hasTransparency = computed(() => {
    return roundness.value > 0 || opacity.value < 100;
  });

  function importValues(values: BackgroundStoreOptions) {
    backgroundStyle.value = values.backgroundStyle;
    roundness.value = values.roundness;
    opacity.value = values.opacity;
    noise.value = values.noise;
  }

  function exportValues(): BackgroundStoreOptions {
    return {
      backgroundStyle: backgroundStyle.value,
      roundness: roundness.value,
      opacity: opacity.value,
      noise: noise.value,
    };
  }

  return {
    backgroundStyle,
    roundness,
    opacity,
    noise,
    hasTransparency,
    importValues,
    exportValues,
  };
});
