import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useBackgroundStore = defineStore('background', () => {
  const roundness = ref(0);

  const backgroundStyle = ref('linear-gradient(45deg, #fada61 0.000%, #ff9188 50.000%, #ff5acd 100.000%)');
  const opacity = ref(100);

  const hasTransparency = computed(() => {
    return roundness.value > 0 || opacity.value < 100;
  });

  return {
    roundness,
    backgroundStyle,
    opacity,
    hasTransparency,
  };
});
